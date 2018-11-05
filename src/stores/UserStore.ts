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
  private user: User

  @observable
  private token: string

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
    fetch("http://charette1.ing.puc.cl/user/login", {
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
      .then(response => response.json(), error => error.message)
      .then(res => {
        this.user = {
          lastName: res.user.last_name,
          username: res.user.username,
          firstName: res.user.first_name,
          email: res.user.email,
        }
        this.token = res.user.token
      })
  }

  @action
  public logout(): void {
    fetch("http://charette1.ing.puc.cl/user/logout", {
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
    fetch("http://charette1.ing.puc.cl/users", {
      method: "POST",
      body: JSON.stringify({
        username: user.username,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then(response => response.json(), error => error.message)
      .then(user => this.login(user.email, password))
  }

  @action
  public resetPassword(email: string) {
    fetch("http://charette1.ing.puc.cl/user/reset-password", {
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
    fetch("http://charette1.ing.puc.cl/user", {
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
