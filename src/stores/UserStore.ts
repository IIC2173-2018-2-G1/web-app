import { observable, computed, action } from "mobx"
import "isomorphic-fetch"
import Router from "next/router"

export interface User {
  username: string
  firstName: string
  lastName: string
  email: string
}

export class UserStore {
  @observable
  private user: User = {
    username: null,
    firstName: null,
    lastName: null,
    email: null,
  }

  @observable
  private token: string

  @observable
  private error: string

  @observable
  private loginSuccessful: boolean = false

  @computed
  public get currentError(): string {
    return this.error
  }

  @computed
  public get currentUser(): User {
    return this.user
  }

  @computed
  public get currentToken(): string {
    return this.token
  }

  @action
  public login(email: string, password: string): void {
    fetch(`http://localhost/v1/users/login`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(response => response.json())
      .then(res => {
        this.token = "Token " + res.user.token
        this.user = {
          email: res.user.email,
          username: res.user.username,
          firstName: res.user.first_name,
          lastName: res.user.last_name,
        }
        Router.push("/")
      })
  }

  @action
  public logout(): void {
    fetch(`http://localhost/v1/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: this.token,
      },
    })
      .then(response => response.json(), error => error.message)
      .then(() => {
        this.user = null
        this.token = null
      })
  }

  @action
  public createUser(user: User, password: string): void {
    fetch(`http://localhost/v1/users`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          username: user.username,
          first_ame: user.firstName,
          last_name: user.lastName,
          email: user.email,
          password: password,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(response => response.json())
      .then(res => {
        this.token = "Token " + res.user.token
        this.user = {
          email: res.user.email,
          username: res.user.username,
          firstName: res.user.first_name,
          lastName: res.user.last_name,
        }
        Router.push("/")
      })
  }

  @action
  public resetPassword(email: string) {
    fetch(`http://localhost/v1/users/reset-password`, {
      method: "GET",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token,
        Accept: "application/json",
      },
    }).then(response => response.json(), error => error.message)
  }

  @action
  public updateUser(user: User): void {
    fetch(`http://localhost/v1/users`, {
      method: "PUT",
      body: JSON.stringify({
        username: user.username,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: this.token,
      },
    })
      .then(response => response.json(), error => error.message)
      .then(
        user =>
          (this.user = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          }),
      )
  }
}
