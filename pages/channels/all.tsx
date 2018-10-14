import React from "react"
import Layout from "../../src/components/Layout"

export interface BrowseChannelsPageProps {}

export interface BrowseChannelsPageState {}

class BrowseChannelsPage extends React.Component<
  BrowseChannelsPageProps,
  BrowseChannelsPageState
> {
  render() {
    return (
      <Layout>
        {" "}
        <h1>Browse all channels!</h1>
      </Layout>
    )
  }
}

export default BrowseChannelsPage
