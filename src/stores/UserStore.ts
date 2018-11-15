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

  @computed
  public get currentUser(): User {
    return this.user
  }

  @action
  public async login(email: string, password: string): Promise<any> {
    return fetch(`http://localhost/v1/users/login`, {
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
      .then(r => {
        if (r.status == 401) {
          Router.push("/login")
          return
        }
        return r
      })
      .then(response => response.json())
      .then(res => {
        window.localStorage.setItem("token", "Token " + res.user.token)
        this.user = {
          email: res.user.email,
          username: res.user.username,
          firstName: res.user.first_name,
          lastName: res.user.last_name,
        }
        return { status: 200 }
      })
      .catch((e: Error) => ({ status: `error: ${e}` }))
  }

  @action
  public logout(): void {
    fetch(`http://localhost/v1/users/logout`, {
      method: "POST",
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
      .then(response => response.json(), error => error.message)
      .then(() => {
        this.user = {
          username: null,
          firstName: null,
          lastName: null,
          email: null,
        }
        window.localStorage.clear()
      })
  }

  @action
  public async createUser(user: User, password: string): Promise<any> {
    return fetch(`http://localhost/v1/users`, {
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
      .then(r => {
        if (r.status == 401) {
          Router.push("/login")
          return
        }
        return r
      })
      .then(response => response.json())
      .then(res => {
        window.localStorage.setItem("token", "Token " + res.user.token)
        this.user = {
          email: res.user.email,
          username: res.user.username,
          firstName: res.user.first_name,
          lastName: res.user.last_name,
        }
        return { status: 200 }
      })
      .catch((e: Error) => ({ status: `error: ${e}` }))
  }

  @action
  public async setCurrentUser(): Promise<any> {
    return fetch(`http://localhost/v1/users/current`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
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
      .then(r => {
        if (!r.ok) {
          throw `${r.status}`
        }
        return r
      })
      .then(response => response.json())
      .then(res => {
        let parsed_user = JSON.parse(res.user)
        window.localStorage.setItem("token", "Token " + parsed_user.token)
        this.user = {
          email: parsed_user.email,
          username: parsed_user.username,
          firstName: parsed_user.first_name,
          lastName: parsed_user.last_name,
        }
        return { status: 200 }
      })
      .catch((e: Error) => ({ status: `${e}`, message: "error :(" }))
  }

  @action
  public resetPassword(email: string) {
    fetch(`http://localhost/v1/users/reset-password?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
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
      .then(response => response.json(), error => error.message)
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
      .then(r => {
        if (!r.ok) {
          throw `${r.status}`
        }
        return r
      })
      .then(response => response.json())
      .then(
        user =>
          (this.user = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          }),
      )
      .catch((e: Error) => ({ status: `${e}`, message: "error :(" }))
  }
}
