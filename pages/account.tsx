import React from "react"
import Layout from "../src/components/Layout"

export interface AccountPageProps {}

export interface AccountPageState {}

class AccountPage extends React.Component<AccountPageProps, AccountPageState> {
  render() {
    return (
      <Layout>
        <h1>Here you can do stuff with your account!</h1>
      </Layout>
    )
  }
}

export default AccountPage
