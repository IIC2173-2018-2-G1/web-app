import React from "react"
import Layout from "../src/components/Layout"

export interface LoginPageProps {}

export interface LoginPageState {}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  render() {
    return (
      <Layout noSideBar>
        <h1>Please do login!</h1>
      </Layout>
    )
  }
}

export default LoginPage
