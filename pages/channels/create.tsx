import React from "react"
import Layout from "../../src/components/Layout"

export interface CreateChannelPageProps {}

export interface CreateChannelPageState {}

class CreateChannelPage extends React.Component<
  CreateChannelPageProps,
  CreateChannelPageState
> {
  render() {
    return (
      <Layout>
        <h1>Create a new channel</h1>
      </Layout>
    )
  }
}

export default CreateChannelPage
