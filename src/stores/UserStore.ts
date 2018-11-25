import { observable, computed, action } from "mobx"
import "isomorphic-fetch"
import Router from "next/router"
import deleteCookie from "../utils/deleteCookie"

export interface User {
  username: string
  first_name: string
  last_name: string
  email?: string
  id?: string
}

export class UserStore {
  @observable
  private current_user: User = {
    username: null,
    first_name: null,
    last_name: null,
    email: null,
    id: null,
  }

  @observable
  private all_users: { [id: string]: User } = {}

  @computed
  public get allUsers(): { [id: string]: User } {
    return this.all_users
  }

  @computed
  public get currentUser(): User {
    return this.current_user
  }

  @action
  public async login(email: string, password: string): Promise<any> {
    return fetch(`/api/v1/users/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(r => {
        if (r.status == 401) {
          Router.push("/login")
          return
        }
        return r
      })
      .then(response => response.json())
      .then(user => (this.current_user = user))
      .then(() => ({ status: 200 }))
      .catch((e: Error) => ({ status: `error: ${e}` }))
  }

  @action
  public logout(): void {
    window.localStorage.clear()
    deleteCookie("_session")
    this.current_user = {
      username: null,
      first_name: null,
      last_name: null,
      email: null,
      id: null,
    }
    this.all_users = {}
    Router.push("/login")
  }

  @action
  public async createUser(user: User, password: string): Promise<any> {
    return fetch(`/api/v1/users`, {
      method: "POST",
      body: JSON.stringify({
        ...user,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(r => {
        if (r.status == 401) {
          Router.push("/login")
          return
        }
        return r
      })
      .then(response => response.json())
      .then(user => (this.current_user = user))
      .then(() => ({ status: 200 }))
      .catch((e: Error) => ({ status: `error: ${e}` }))
  }

  @action
  public async setCurrentUser(): Promise<void> {
    fetch(`/api/v1/users/current`)
      .then(response => response.json())
      .then(user => (this.current_user = user))
      .then(() => ({ status: 200 }))
      .catch((e: Error) => ({ status: `${e}`, message: "error :(" }))
  }

  @action
  public async setAllUsers(): Promise<void> {
    fetch(`/api/v1/users`)
      .then(response => response.json())
      .then(
        users =>
          (this.all_users = users.reduce((map, new_user) => {
            map[new_user.id] = new_user
            return map
          }, {})),
      )
      .then(() => ({ status: 200 }))
      .catch((e: Error) => ({ status: `${e}`, message: "error :(" }))
  }

  @action
  public resetPassword(email: string) {
    fetch(`/api/v1/users/reset-password?email=${email}`)
      .then(r => {
        if (r.status == 401) {
          Router.push("/login")
          return
        }
        return r
      })
      .then(response => response.json(), error => error.message)
  }

  @action
  public updateUser(
    first_name: string,
    last_name: string,
    password: string,
  ): void {
    fetch(`/api/v1/users/current`, {
      method: "PUT",
      body: JSON.stringify({
        first_name,
        last_name,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(response => response.json())
      .then(user => {
        this.current_user = user
        this.all_users[user.id] = user
      })
      .catch((e: Error) => ({ status: `${e}`, message: "error :(" }))
  }
}
