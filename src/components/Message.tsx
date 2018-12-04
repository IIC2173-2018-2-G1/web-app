import * as React from "react"
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import ListItem from "@material-ui/core/ListItem"
import Avatar from "@material-ui/core/Avatar"
import Tooltip from "@material-ui/core/Tooltip"
import ReplyIcon from "@material-ui/icons/Reply"
import ReactionIcon from "@material-ui/icons/InsertEmoticon"
import { Paper } from "@material-ui/core"

const styles = (theme: Theme) =>
  createStyles({
    container: {
      cursor: "default",
      position: "relative",
    },
    avatar: {
      borderRadius: theme.shape.borderRadius,
      height: 35,
      width: 35,
    },
    actionBar: {
      position: "absolute",
      top: 5,
      right: 10,
      background: theme.palette.background.paper,
      border: "solid 1px",
      borderRadius: theme.shape.borderRadius,
      padding: `0 ${theme.spacing.unit}px`,
    },
    actionButton: {
      cursor: "pointer",
      "&:hover": {
        color: theme.palette.secondary.light,
      },
    },
    columns: {
      display: "flex",
      flexDirection: "row",
    },
    rows: {
      display: "flex",
      flexDirection: "column",
      padding: `0 ${theme.spacing.unit}px`,
    },
    username: {
      paddingTop: 0,
      marginRight: theme.spacing.unit,
      fontWeight: "bold",
      marginBottom: theme.spacing.unit,
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      marginBottom: theme.spacing.unit * 8,
      display: "block",
      alignItems: "left",
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
        .spacing.unit * 3}px`,
    },
  })

export interface MessageProps extends WithStyles<typeof styles> {
  content: string
  id: string
  username: string
  first_name: string
  last_name: string
  actionBar: boolean
  response: { content: string; user: string }
  handleResponseClick: (string) => void
  date: Date
}

export interface MessageState {
  isHovered: boolean
}

class Message extends React.Component<MessageProps, MessageState> {
  state = {
    isHovered: false,
  }
  getInitials = () => {
    return (
      this.props.first_name.charAt(0).toUpperCase() +
      this.props.last_name.charAt(0).toUpperCase()
    )
  }

  mouseEnter = () => {
    this.setState({ isHovered: true })
  }

  mouseLeave = () => {
    this.setState({ isHovered: false })
  }

  responseClick = () => {
    this.props.handleResponseClick({
      id: this.props.id,
      content: this.props.content,
    })
  }

  renderActionBar = () => {
    if (!this.state.isHovered) return
    const { classes } = this.props
    return (
      <div className={classes.actionBar}>
        <Tooltip title="Reply to this message" onClick={this.responseClick}>
          <ReplyIcon color="action" className={classes.actionButton} />
        </Tooltip>
        <Tooltip title="Add a reaction">
          <ReactionIcon color="action" className={classes.actionButton} />
        </Tooltip>
      </div>
    )
  }

  renderResponse = () => {
    const { classes } = this.props
    return (
      <Paper className={classes.paper} elevation={1}>
        <Typography component="h5">{this.props.response.user}</Typography>
        <Typography component="p">{this.props.response.content}</Typography>
      </Paper>
    )
  }

  render() {
    const { classes } = this.props
    return (
      <ListItem
        className={classes.container}
        button
        disableRipple
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
      >
        {this.props.actionBar ? this.renderActionBar() : null}
        {this.props.response ? this.renderResponse() : null}
        <div className={classes.columns}>
          <Avatar className={classes.avatar}>{this.getInitials()}</Avatar>
          <div className={classes.rows}>
            <div className={classes.columns}>
              <Typography variant="caption" className={classes.username}>
                {this.props.username}
              </Typography>
              <Typography variant="caption">{this.props.date}</Typography>
            </div>
            <Typography variant="body2">{this.props.content}</Typography>
          </div>
        </div>
      </ListItem>
    )
  }
}

export default withStyles(styles)(Message)
