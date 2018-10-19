import { observable, computed, action } from "mobx"
import "isomorphic-fetch"

export interface Channel {
  id: string
  name: string
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
  private messages: Message[] = []

  @observable
  private awaitingResponse: boolean = false

  @computed
  public get currentChannel(): Channel {
    return this.channel
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
  public setChannel(channelID: string): void {
    this.channel = { id: channelID, name: `Channel ${channelID}` }
    this.messages = []
    this.awaitingResponse = true

    let n_messages = Math.floor(Math.random() * 30)

    fetch(`https://loripsum.net/api/${n_messages}/short/plaintext`)
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
