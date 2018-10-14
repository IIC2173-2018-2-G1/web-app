import React from "react"
import { WithStyles, createStyles, withStyles } from "@material-ui/core/styles"
import "isomorphic-fetch"
import Layout from "../../src/components/Layout"

const styles = theme => createStyles({})

export interface ChannelPageProps extends WithStyles<typeof styles> {
  id: string
  content: string
}

export interface ChannelPageState {}

class ChannelPage extends React.Component<ChannelPageProps, ChannelPageState> {
  static async getInitialProps({ query }) {
    const content = await fetch("https://loripsum.net/api").then(res =>
      res.text(),
    )
    return { id: query.id, content }
  }

  render() {
    const { classes } = this.props
    return (
      <Layout>
        <h1>Channel {this.props.id}!</h1>
        <section dangerouslySetInnerHTML={{ __html: this.props.content }} />
      </Layout>
    )
  }
}

export default withStyles(styles)(ChannelPage)
