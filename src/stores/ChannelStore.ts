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
  public addChannel(newChannel: Channel): void {
    // TODO Request for create a channel, push the response to the list
    fetch("http://charette1.ing.puc.cl/channels", {
      method: "POST",
      body: JSON.stringify({
        name: newChannel.name,
        descirption: newChannel.description,
      }),
      headers: {
        "Content-Type": "application/json",
        // TODO Include user's header token
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
  public setChannelList(): void {
    this.channelList = []
    this.channelList = [
      { description: "", subscriptionOn: false, name: "channel one", id: 1 },
      { description: "", subscriptionOn: false, name: "channel two", id: 2 },
      { description: "", subscriptionOn: false, name: "channel three", id: 3 },
      { description: "", subscriptionOn: false, name: "channel four", id: 4 },
      { description: "", subscriptionOn: false, name: "channel five", id: 5 },
      { description: "", subscriptionOn: false, name: "channel six", id: 6 },
      { description: "", subscriptionOn: false, name: "channel seven", id: 7 },
      { description: "", subscriptionOn: false, name: "channel eight", id: 8 },
      { description: "", subscriptionOn: false, name: "channel nine", id: 9 },
      { description: "", subscriptionOn: false, name: "channel ten", id: 10 },
    ]
    this.awaitingResponse = true
    // TODO Handle channels and subscriptions responses
    Promise.all([
      fetch("http://charette1.ing.puc.cl/channels", { mode: "no-cors" }),
      fetch("http://charette1.ing.puc.cl/user/subscriptions", {
        mode: "no-cors",
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
  public setChannel(channelID: number): void {
    this.channel = this.channelList.filter(ch => ch.id == channelID)[0]
    this.messages = []
    this.awaitingResponse = true

    let n_messages = Math.floor(Math.random() * 30)

    fetch(`https://loripsum.net/api/${n_messages}/short/plaintext`, {
      mode: "no-cors",
    })
      .then(res => res.text())
      .then(raw => raw.split(/\n\n/))
      .then(
        raw_array =>
          (this.messages = raw_array.map((content, ix) => ({
            content,
            username: "mabucchi",
            id: `${ix}`,
          }))),
      )
      .then(() => (this.awaitingResponse = false))
  }
}
