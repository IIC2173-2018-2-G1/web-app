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
  private channel: Channel = { id: null, name: null, description: null }

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
  public addChannel(newChannel: Channel): void {
    fetch(`http://localhost/v1/channels`, {
      method: "POST",
      body: JSON.stringify({
        name: newChannel.name,
        description: newChannel.description,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    })
      .then(r => {
        if (r.status == 401) {
          Router.push("/login")
          return
        }
        return r
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
    this.awaitingResponse = true
    // TODO Handle channels and subscriptions responses
    fetch(`http://localhost/v1/channels`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    })
      .then(r => {
        if (r.status == 401) {
          Router.push("/login")
          return
        }
        return r
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
      .catch(e => console.log(`Error getting channels: ${e}`))
  }

  @action
  public setChannel(channel_id: string, count: number, start: number): void {
    this.channel = this.channelList.filter(ch => ch.id == channel_id)[0]
    this.messages = []

    this.awaitingResponse = true
    fetch(
      `http://localhost/v1/messages?channel_id=${1234}&start=${start}&count=${count}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: window.localStorage.getItem("token"),
        },
      },
    )
      .then(r => {
        if (r.status == 401) {
          Router.push("/login")
          return
        }
        return r
      })
      .then(res => res.json())
      .then(res => {
        if (res.Error != "") {
          throw res.Error
        } else {
          this.messages = res.messages.map(m => ({
            id: m.id,
            content: m.content,
            username: m.username,
          }))
        }
      })
      .then(() => (this.awaitingResponse = false))
      .catch(e => console.log(`Error getting channel messages: ${e}`))
  }

  @action
  public sendMessage(
    channel_id: string,
    content: string,
    response_to: string,
  ): void {
    fetch(`http://localhost/v1/messages`, {
      method: "POST",
      body: JSON.stringify({
        channel_id,
        content,
        response_to,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    })
      .then(r => {
        if (r.status == 401) {
          Router.push("/login")
          return
        }
        return r
      })
      .then(() => this.setChannel(channel_id, 50, 0))
      .catch(e => console.log(`Error sending message: ${e}`))
  }
}
