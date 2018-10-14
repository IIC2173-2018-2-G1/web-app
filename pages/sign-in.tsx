import React from "react"
import Layout from "../src/components/Layout"

export interface SignInPageProps {}

export interface SignInPageState {}

class SignInPage extends React.Component<SignInPageProps, SignInPageState> {
  render() {
    return (
      <Layout noSideBar>
        <h1>Please sign in to our wonderful service!</h1>
      </Layout>
    )
  }
}

export default SignInPage
