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
import TextField from "@material-ui/core/TextField"

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
      display: "flex",
      flexGrow: 1,
      flexDirection: "column-reverse",
      overflow: "auto",
    },
    listEnd: {},
    textInput: {
      padding: theme.spacing.unit * 2,
      paddingTop: 0,
      position: "sticky",
      bottom: 0,
      background: theme.palette.background.default,
    },
  })

export interface ChannelPageProps extends WithStyles<typeof styles> {
  id: string
  posts: string[]
}

export interface ChannelPageState {
  subscribed: boolean
  newMessageInput: string
}

class ChannelPage extends React.Component<ChannelPageProps, ChannelPageState> {
  private listEnd: Element
  state = {
    newMessageInput: "",
    subscribed: false,
  }

  static async getInitialProps({ query }) {
    // getting fake posts
    const posts = await fetch("https://loripsum.net/api/40/short/plaintext")
      .then(res => res.text())
      .then(raw => raw.split(/\n\n/))
    return { id: query.id, posts, key: query.id }
  }

  subscribeButtonClicked = () => {
    this.setState({ subscribed: !this.state.subscribed })
  }

  componentDidMount() {
    this.listEnd.scrollIntoView()
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newMessageInput: e.target.value })
  }

  handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      // enter and no shift pressed
      e.preventDefault()
      this.setState({ newMessageInput: "" })
    }
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
          <div className={classes.listEnd} ref={el => (this.listEnd = el)} />
          {this.props.posts.map((post, ix) => (
            <Message key={ix} content={`${ix}. ${post}`} username="mabucchi" />
          ))}
        </List>
        <TextField
          multiline
          fullWidth
          className={classes.textInput}
          id="text-input"
          placeholder="Write a message!"
          variant="outlined"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          value={this.state.newMessageInput}
        />
      </Layout>
    )
  }
}

export default withStyles(styles)(ChannelPage)
