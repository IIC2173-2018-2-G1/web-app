import { observable, computed, action } from "mobx"
import "isomorphic-fetch"

export interface User {
  username: string
  firstName: string
  lastName: string
  email: string
}

export class UserStore {
  @observable
  private user: User = null

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
  public get loginSuccess(): boolean {
    return this.loginSuccessful
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
    fetch(`http://localhost/v1/user/login`, {
      mode: "no-cors",
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then(
        response => {
          response.json()
          this.loginSuccessful = true
        },
        error => {
          this.loginSuccessful = false
          this.error = error
        },
      )
      .then(res => {
        if (this.loginSuccessful) {
          this.user = {
            lastName: res.user.last_name,
            username: res.user.username,
            firstName: res.user.first_name,
            email: res.user.email,
          }
          this.token = res.user.token
        } else {
          this.user = null
          this.token = null
        }
      })
  }

  @action
  public logout(): void {
    fetch(`http://localhost/v1/user/logout`, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token,
      },
      credentials: "same-origin",
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
      },
    })
      .then(
        response => {
          response.body
        },
        error => error.message,
      )
      .then(res => {
        console.log(res)
        this.token = res.user.token
        this.user = {
          email: res.user.email,
          username: res.user.username,
          firstName: res.user.first_name,
          lastName: res.user.last_name,
        }
        window.location.replace("/")
      })
  }

  @action
  public resetPassword(email: string) {
    fetch(`http://localhost/v1/user/reset-password`, {
      mode: "no-cors",
      method: "GET",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    }).then(response => response.json(), error => error.message)
  }

  @action
  public updateUser(user: User): void {
    fetch(`http://localhost/v1/user`, {
      mode: "no-cors",
      method: "PUT",
      body: JSON.stringify({
        username: user.username,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token,
      },
      credentials: "same-origin",
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
