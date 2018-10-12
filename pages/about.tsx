import * as React from "react"
import { NextContext } from "next"
import "isomorphic-fetch"
import Page from "../components/layout/Page"

export interface AboutPageProps {
  name?: string
  stars?: number
}

export interface AboutPageState {}

class AboutPage extends React.Component<AboutPageProps, AboutPageState> {
  static async getInitialProps(ctx: NextContext) {
    const name = ctx.query.name as string
    return { name }
  }
  render() {
    return (
      <Page>
        <p>This is the about page! {this.props.name}</p>
      </Page>
    )
  }
}

export default AboutPage
