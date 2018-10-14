import React from "react"
import Layout from "../src/components/Layout"

export interface HashtagsPageProps {}

export interface HashtagsPageState {}

class HashtagsPage extends React.Component<
  HashtagsPageProps,
  HashtagsPageState
> {
  render() {
    return (
      <Layout>
        <h1>Search for a Hashtag!</h1>
      </Layout>
    )
  }
}

export default HashtagsPage
