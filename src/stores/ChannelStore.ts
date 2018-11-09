import { observable, computed, action } from "mobx"
import "isomorphic-fetch"
import Router from "next/router"

export interface Channel {
  id: string
  name: string
  description: string
}

export interface Message {
  id: string
  username: string
  content: string
}

export class ChannelStore {
  @observable
  private channel: Channel

  @observable
  private channelList: Channel[] = []

  @observable
  private messages: Message[] = []

  @observable
  private awaitingResponse: boolean = false

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
    return !this.awaitingResponse
  }

  @action
  public addChannel(newChannel: Channel, token: string): void {
    fetch(`http://localhost/v1/channels`, {
      method: "POST",
      body: JSON.stringify({
        name: newChannel.name,
        description: newChannel.description,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    })
      .then(res => res.json())
      .then(raw => {
        this.setChannelList(token)
        return raw.channel[0]._id
      })
      .then(id => Router.push(`/channel?id=${id}`))
  }

  @action
  public setChannelList(token: string): void {
    this.awaitingResponse = true
    // TODO Handle channels and subscriptions responses
    fetch(`http://localhost/v1/channels`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(channels_r => {
        if (channels_r.ok) {
          return channels_r.json()
        } else {
          return { channels: this.channelList }
        }
      })
      .then(res => res.channels)
      .then(obj => {
        this.channelList = obj.map(ch => ({
          id: ch._id,
          name: ch.name,
          description: ch.description,
        }))
      })
      .then(() => (this.awaitingResponse = false))
  }

  @action
  public setChannel(
    channel_id: string,
    token: string,
    count: number,
    start: number,
  ): void {
    this.channel = this.channelList.filter(ch => ch.id == channel_id)[0]
    this.messages = []

    this.awaitingResponse = true
    fetch(
      `http://localhost/v1/messages?channel_id=${channel_id}&start=${start}&count=${count}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      },
    )
      .then(res => res.json())
      .then(raw_array => (this.messages = raw_array))
      .then(() => (this.awaitingResponse = false))
  }
}
