import { observable, computed, action } from "mobx"
import "isomorphic-fetch"

export interface Hashtag {
  id: string
  name: string
}

export interface Message {
  id: string
  username: string
  content: string
}

export class HashtagStore {
  @observable
  hashtag: Hashtag = { id: null, name: "" }

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
  public setHashtagList(): void {
    this.awaitingResponse = true
    fetch(`http://localhost/v1/hashtags`, {
      method: "GET",
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
      .then(
        raw_array =>
          (this.hashtagList = raw_array.hashtags.map(hs => ({
            id: hs._id,
            name: hs.name,
          }))),
      )
      .then(() => (this.awaitingResponse = false))
      .catch(() => console.log("Error getting hashtags"))
  }

  @action
  public getMessages(hashtag: string, start: number, count: number): void {
    this.awaitingResponse = true
    fetch(
      `http://localhost/v1/messages?hashtag=${hashtag}&start=${start}&count=${count}`,
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
      .then(raw_array => (this.messages = raw_array))
      .then(() => (this.awaitingResponse = false))
      .catch(() => console.log("Error getting hashtag messages"))
  }
}
