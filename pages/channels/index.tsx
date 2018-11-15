import React from "react"
import { inject, observer } from "mobx-react"
import { when } from "mobx"
import {
  WithStyles,
  createStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles"
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
import Layout from "../../src/components/Layout"
import Message from "../../src/components/Message"
import { ChannelStore } from "../../src/stores/ChannelStore"
import { UserStore } from "../../src/stores/UserStore"

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
      minHeight: "calc(100% - 70px)",
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
  channelStore?: ChannelStore
  userStore?: UserStore
}

export interface ChannelPageState {
  subscribed: boolean
  newMessageInput: string
}

@inject("channelStore")
@inject("userStore")
@observer
class ChannelPage extends React.Component<ChannelPageProps, ChannelPageState> {
  private listEnd: Element
  state = {
    newMessageInput: "",
    subscribed: false,
  }

  static async getInitialProps({ query }) {
    return { id: query.id, key: query.id }
  }

  subscribeButtonClicked = () => {
    this.setState({ subscribed: !this.state.subscribed })
  }

  componentWillMount() {
    this.props.channelStore.setChannel(this.props.id, 0, 50)
  }

  componentDidMount() {
    when(() => this.props.channelStore.loaded, this.scrollToBottom)
  }

  scrollToBottom = () => {
    if (this.listEnd) this.listEnd.scrollIntoView()
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newMessageInput: e.target.value })
  }

  handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      this.props.channelStore.sendMessage(
        this.props.id,
        this.state.newMessageInput,
        null,
      )
      e.preventDefault()
      this.setState({ newMessageInput: "" })
    }
  }

  render() {
    const { classes } = this.props
    return (
      <Layout pageTitle={this.props.channelStore.currentChannel.name}>
        <AppBar position="sticky" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.grow}>
              {this.props.channelStore.currentChannel.name}!
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
          {this.props.channelStore.currentMessages.map((msg, ix) => (
            <Message
              key={msg.id}
              content={`${ix}. ${msg.content}`}
              username={msg.username}
              actionBar={true}
            />
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
