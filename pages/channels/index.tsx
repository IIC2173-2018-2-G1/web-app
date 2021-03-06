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
import { Paper } from "@material-ui/core"

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
    paper: {
      margin: theme.spacing.unit,
      display: "block",
      position: "sticky",
      alignItems: "left",
      padding: theme.spacing.unit * 3,
    },
    closeImg: {
      cursor: "pointer",
      float: "right",
      marginTop: "5px",
      width: "20px",
    },
    username: {
      paddingTop: 0,
      marginRight: theme.spacing.unit,
      fontWeight: "bold",
      marginBottom: theme.spacing.unit,
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
  responseTo: { id: string; content: string; username: string }
}

@inject("channelStore")
@inject("userStore")
@observer
class ChannelPage extends React.Component<ChannelPageProps, ChannelPageState> {
  private listEnd: Element
  textInput = null
  state = {
    newMessageInput: "",
    subscribed: false,
    responseTo: null,
  }

  componentDidMount() {
    this.focusMessageInput()
  }

  static async getInitialProps({ query }) {
    return { id: query.id, key: query.id }
  }

  subscribeButtonClicked = () => {
    this.setState({ subscribed: !this.state.subscribed })
  }

  componentWillMount() {
    this.props.channelStore.setChannel(this.props.id)
    when(() => this.props.channelStore.loaded, this.scrollToBottom)
  }

  scrollToBottom = () => {
    if (this.listEnd) this.listEnd.scrollIntoView()
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newMessageInput: e.target.value })
  }

  focusMessageInput = () => {
    if (this.textInput) {
      setTimeout(() => {
        this.textInput.focus()
      }, 100)
    }
  }

  getMessage = (id: string) => {
    let filtered = this.props.channelStore.currentMessages.filter(
      m => m.id === id,
    )
    if (filtered.length > 0) {
      return filtered[0]
    } else {
      return null
    }
  }

  handleResponseClick = responseTo => {
    this.setState({ responseTo }, () => this.focusMessageInput())
  }

  cancelResponse = () => {
    this.setState({ responseTo: null })
  }

  handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      if (this.state.responseTo == null) {
        this.props.channelStore.sendMessage(
          this.props.id,
          this.state.newMessageInput,
        )
      } else {
        this.props.channelStore.answerMessage(
          this.props.id,
          this.state.newMessageInput,
          this.state.responseTo.id,
        )
      }
      e.preventDefault()
      this.setState({ newMessageInput: "", responseTo: null })
      when(() => this.props.channelStore.loaded, this.scrollToBottom)
    } else if (e.keyCode == 27) {
      this.setState({ responseTo: null })
    }
  }

  render() {
    const { classes } = this.props
    return (
      <Layout pageTitle={this.props.channelStore.currentChannel.name}>
        <AppBar position="sticky" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.grow}>
              {this.props.channelStore.loaded
                ? this.props.channelStore.currentChannel.name
                : "Loading..."}
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
          {this.props.channelStore.currentMessages.map(msg => {
            const user = this.props.userStore.allUsers[msg.user_id]
            const resp_msg =
              msg.response_to != null ? this.getMessage(msg.response_to) : null
            const resp_obj =
              resp_msg != null
                ? {
                    content: resp_msg.content,
                    user: this.props.userStore.allUsers[resp_msg.user_id]
                      .username,
                  }
                : null
            return (
              <Message
                key={msg.id}
                content={msg.content}
                id={msg.id}
                response={resp_obj}
                first_name={user.first_name}
                last_name={user.last_name}
                username={user.username}
                handleResponseClick={this.handleResponseClick}
                actionBar={true}
                date={msg.created_on}
              />
            )
          })}
        </List>
        {this.state.responseTo ? (
          <Paper className={classes.paper} elevation={1}>
            <Typography variant="caption" className={classes.username}>
              {this.state.responseTo.username}
            </Typography>
            <Typography variant="body2">
              {this.state.responseTo.content}
            </Typography>
          </Paper>
        ) : null}
        <TextField
          inputRef={i => (this.textInput = i)}
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
