import React from "react"
import Link from "next/link"

export interface LoginPageProps {}

export interface LoginPageState {}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  render() {
    return (
      <React.Fragment>
        <h1>Hello World!</h1>
        <Link href="/">
          <button> go to home page!</button>
        </Link>
      </React.Fragment>
    )
  }
}

export default LoginPage
