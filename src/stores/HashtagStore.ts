import { observable, computed, action } from "mobx"
import "isomorphic-fetch"

export interface Hashtag {
  id: string
  name: string
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

export class HashtagStore {
  @observable
  hashtag: Hashtag = { id: null, name: "" }

  @observable
  hashtagList: Hashtag[] = []

  @observable
  private messages: Message[] = []

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

  @action
  public setHashtagList(): void {
    fetch(`/api/v1/hashtags`)
      .then(res => res.json())
      .then(raw_array => (this.hashtagList = raw_array))
      .catch(() => console.log("Error getting hashtags"))
  }

  @action
  public getMessages(hashtag: string): void {
    fetch(`/api/v1/messages?hashtag=${hashtag}`)
      .then(res => res.json())
      .then(raw_array => (this.messages = raw_array))
      .catch(() => console.log("Error getting hashtag messages"))
  }
}
