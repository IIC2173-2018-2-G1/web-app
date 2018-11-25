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
  })

export interface MessageProps extends WithStyles<typeof styles> {
  content: string
  first_name: string
  last_name: string
  actionBar: boolean
}

export interface MessageState {
  isHovered: boolean
}

class Message extends React.Component<MessageProps, MessageState> {
  state = {
    isHovered: false,
  }
  getInitials = () => {
    return this.props.first_name.charAt(0).toUpperCase() + this.props.last_name.charAt(0).toUpperCase()
  }

  mouseEnter = () => {
    this.setState({ isHovered: true })
  }

  mouseLeave = () => {
    this.setState({ isHovered: false })
  }

  renderActionBar = () => {
    if (!this.state.isHovered) return
    const { classes } = this.props
    return (
      <div className={classes.actionBar}>
        <Tooltip title="Reply to this message">
          <ReplyIcon color="action" className={classes.actionButton} />
        </Tooltip>
        <Tooltip title="Add a reaction">
          <ReactionIcon color="action" className={classes.actionButton} />
        </Tooltip>
      </div>
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
        <div className={classes.columns}>
          <Avatar className={classes.avatar}>{this.getInitials()}</Avatar>
          <div className={classes.rows}>
            <div className={classes.columns}>
              <Typography variant="caption" className={classes.username}>
                {this.props.username}
              </Typography>
              <Typography variant="caption">5:15 PM</Typography>
            </div>
            <Typography variant="body2">{this.props.content}</Typography>
          </div>
        </div>
      </ListItem>
    )
  }
}

export default withStyles(styles)(Message)
