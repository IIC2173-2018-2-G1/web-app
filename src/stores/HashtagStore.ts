import { observable, computed, action } from "mobx"
import "isomorphic-fetch"

export interface Hashtag {
  id: number
  name: string
}

export interface Message {
  id: string
  username: string
  content: string
}

export class HashtagStore {
  @observable
  hashtag: Hashtag

  @observable
  hashtagList: Hashtag[] = []

  @observable
  private messages: Message[] = []

  @observable
  private awaitingResponse: boolean = false

  @computed
  public get currentHashtag(): Hashtag {
    return this.hashtag
  }

  @computed
  public get currentHashtagList(): Hashtag[] {
    return this.hashtagList
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
  public setHashtagList(token: string): void {
    this.awaitingResponse = true
    fetch("http://charette1.ing.puc.cl/api/v1/hashtags", {
      mode: "no-cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "same-origin",
    })
      .then(res => res.json())
      .then(raw_array => (this.hashtagList = raw_array))
      .then(() => (this.awaitingResponse = false))
  }

  @action
  public getMessages(
    hashtag: string,
    token: string,
    start: number,
    count: number,
  ): void {
    this.awaitingResponse = true
    fetch("http://charette1.ing.puc.cl/api/v1/messages", {
      mode: "no-cors",
      method: "GET",
      body: JSON.stringify({
        hashtag,
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
