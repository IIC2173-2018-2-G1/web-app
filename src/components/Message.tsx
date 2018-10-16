import * as React from "react"
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import ListItem from "@material-ui/core/ListItem"

const styles = (theme: Theme) =>
  createStyles({
    container: {},
  })

export interface MessageProps extends WithStyles<typeof styles> {
  content: string
}

export interface MessageState {}

class Message extends React.Component<MessageProps, MessageState> {
  render() {
    const { classes } = this.props
    return (
      <ListItem className={classes.container} button>
        <Typography>{this.props.content}</Typography>
      </ListItem>
    )
  }
}

export default withStyles(styles)(Message)
