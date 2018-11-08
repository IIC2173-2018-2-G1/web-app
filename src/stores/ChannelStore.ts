import { observable, computed, action } from "mobx"
import "isomorphic-fetch"

export interface Channel {
  id: number
  name: string
  description: string
  subscriptionOn: boolean
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
    fetch("http://charette1.ing.puc.cl/api/v1/channels", {
      mode: "no-cors",
      method: "POST",
      body: JSON.stringify({
        name: newChannel.name,
        descirption: newChannel.description,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "same-origin",
    })
      .then(response => response.json(), error => error.message)
      .then(ch => {
        let channel = {
          id: ch.id,
          name: ch.name,
          description: ch.description,
          subscriptionOn: false,
        }
        this.channelList = this.channelList.concat([channel])
      })
  }

  @action
  public setChannelList(token: string): void {
    this.awaitingResponse = true
    // TODO Handle channels and subscriptions responses
    Promise.all([
      fetch("http://charette1.ing.puc.cl/api/v1/channels", {
        mode: "no-cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        credentials: "same-origin",
      }),
      fetch("http://charette1.ing.puc.cl/api/v1/user/subscriptions", {
        mode: "no-cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        credentials: "same-origin",
      }),
    ])
      .then(([channels_r, subscriptions_r]) => {
        if (channels_r.ok && subscriptions_r.ok) {
          return { channels: channels_r.json(), subs: subscriptions_r.json() }
        } else {
          return {
            channels: this.channelList,
            subs: this.channelList.filter(ch => ch.subscriptionOn),
          }
        }
      })
      .then(obj => {
        this.channelList = obj.channels.map(ch => ({
          id: ch.id,
          name: ch.name,
          subscriptionOn: obj.subs.filter(s => s.id == ch.id).length > 0,
        }))
      })
      .then(() => (this.awaitingResponse = false))
  }

  @action
  public setChannel(
    channel_id: number,
    token: string,
    count: number,
    start: number,
  ): void {
    this.channel = this.channelList.filter(ch => ch.id == channel_id)[0]
    this.messages = []

    this.awaitingResponse = true
    fetch("http://charette1.ing.puc.cl/api/v1/messages", {
      mode: "no-cors",
      method: "GET",
      body: JSON.stringify({
        channel_id,
        start,
        count,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "same-origin",
    })
      .then(res => res.json())
      .then(raw_array => (this.messages = raw_array))
      .then(() => (this.awaitingResponse = false))
  }
}
