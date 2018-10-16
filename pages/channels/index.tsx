import React from "react"
import {
  WithStyles,
  createStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles"
import "isomorphic-fetch"
import Layout from "../../src/components/Layout"
import Message from "../../src/components/Message"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import Tooltip from "@material-ui/core/Tooltip"
import Info from "@material-ui/icons/InfoOutlined"
import Star from "@material-ui/icons/Star"
import StarBorder from "@material-ui/icons/StarBorder"
import Zoom from "@material-ui/core/Zoom"
import List from "@material-ui/core/List"

const styles = (theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    appBar: {
      background: theme.palette.background.default,
      height: 70,
      justifyContent: "center",
    },
    messageList: {
      padding: theme.spacing.unit * 2,
    },
    listEnd: {},
  })

export interface ChannelPageProps extends WithStyles<typeof styles> {
  id: string
  posts: string[]
}

export interface ChannelPageState {
  subscribed: boolean
}

class ChannelPage extends React.Component<ChannelPageProps, ChannelPageState> {
  private listEnd: Element
  state = {
    subscribed: false,
  }

  static async getInitialProps({ query }) {
    // getting fake posts
    const posts = await fetch("https://loripsum.net/api/40/short/plaintext")
      .then(res => res.text())
      .then(raw => raw.split(/\n\n/))
    return { id: query.id, posts }
  }

  subscribeButtonClicked = () => {
    this.setState({ subscribed: !this.state.subscribed })
  }

  componentDidMount() {
    this.listEnd.scrollIntoView()
  }

  componentDidUpdate() {
    this.listEnd.scrollIntoView()
  }

  render() {
    const { classes } = this.props
    return (
      <Layout>
        <AppBar position="sticky" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.grow}>
              Channel {this.props.id}!
            </Typography>
            <Tooltip TransitionComponent={Zoom} title="Show channel info">
              <IconButton aria-label="Info">
                <Info />
              </IconButton>
            </Tooltip>
            <Tooltip
              TransitionComponent={Zoom}
              title={
                this.state.subscribed
                  ? "Unsubscribe from channel"
                  : "Subscribe to channel"
              }
            >
              <IconButton
                aria-label="Subscribe"
                onClick={this.subscribeButtonClicked}
              >
                {this.state.subscribed ? <Star /> : <StarBorder />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <List className={classes.messageList}>
          {this.props.posts.reverse().map((post, ix) => (
            <Message key={ix} content={post} />
          ))}
          <div className={classes.listEnd} ref={el => (this.listEnd = el)} />
        </List>
      </Layout>
    )
  }
}

export default withStyles(styles)(ChannelPage)
