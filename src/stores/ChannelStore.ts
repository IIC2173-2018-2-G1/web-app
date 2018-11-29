import { observable, computed, action, when } from "mobx"
import "isomorphic-fetch"
import Router from "next/router"

export interface Channel {
  id: string
  name: string
  description: string
}

export interface Reaction {
  id: string
  name: string
}

export interface Message {
  id: string
  user_id: string
  channel_id: string
  content: string
  response_to?: string
  created_on: Date
  reactions: Reaction[]
}

export class ChannelStore {
  @observable
  private channel: Channel = { id: null, name: null, description: null }

  @observable
  private channelList: Channel[] = []

  @observable
  private messages: Message[] = []

  @observable
  private awaitingResponse: number = 0

  @computed
  public get currentChannel(): Channel {
    return this.channel
  }

  @computed
  public get currentChannelList(): Channel[] {
    return this.channelList
  }

  @computed
  public get currentMessages(): Message[] {
    return this.messages
  }

  @computed
  public get loaded(): boolean {
    return this.awaitingResponse == 0
  }

  @action
  public addChannel(newChannel: Channel): void {
    fetch(`/api/v1/channels`, {
      method: "POST",
      body: JSON.stringify({
        name: newChannel.name,
        description: newChannel.description,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(res => res.json())
      .then(raw => {
        this.setChannelList()
        return raw.channel[0]._id
      })
      .then(id => Router.push(`/channels?id=${id}`))
      .catch(e => console.log(`Error creating a channel: ${e}`))
  }

  @action
  public setChannelList(): void {
    this.awaitingResponse += 1
    // TODO Handle channels and subscriptions responses
    fetch(`/api/v1/channels`)
      .then(res => res.json())
      .then(channels => (this.channelList = channels))
      .then(() => (this.awaitingResponse -= 1))
      .catch(e => console.log(`Error getting channels: ${e}`))
  }

  @action
  public async setChannel(channel_id: string): Promise<void> {
    await when(() => this.loaded)
    this.channel = this.channelList.filter(ch => ch.id == channel_id)[0]
    this.messages = []

    this.awaitingResponse += 1
    fetch(`/api/v1/messages?channel_id=${channel_id}`)
      .then(res => res.json())
      .then(messages => (this.messages = messages))
      .then(() => (this.awaitingResponse -= 1))
      .catch(e => console.log(`Error getting channel messages: ${e}`))
  }

  @action
  public sendMessage(channel_id: string, content: string): void {
    fetch(`/api/v1/messages`, {
      method: "POST",
      body: JSON.stringify({
        channel_id,
        content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(() => this.setChannel(this.channel.id))
      .catch(e => console.log(`Error sending message: ${e}`))
  }
}
