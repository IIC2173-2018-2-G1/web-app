import React from "react"
import Link from "next/link"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { Tooltip, Zoom, IconButton } from "@material-ui/core"
import Star from "@material-ui/icons/Star"
import StarBorder from "@material-ui/icons/StarBorder"
import {
  WithStyles,
  createStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles"

const styles = (theme: Theme) =>
  createStyles({
    listButton: {
      position: "absolute",
      top: "50%",
      marginTop: -16,
      zIndex: 100,
      padding: 3,
      left: 180,
    },
  })

export interface ChannelItemProps extends WithStyles<typeof styles> {
  channel_id: number
  channel_name: string
}

export interface ChannelItemState {
  subscriptionOn: boolean
  subscriptionTooltipOpen: boolean
}

class ChannelItem extends React.Component<ChannelItemProps, ChannelItemState> {
  constructor(props: ChannelItemProps) {
    super(props)
    this.state = {
      subscriptionOn: false,
      subscriptionTooltipOpen: false,
    }
  }

  handleSubscriptionClick = () => {
    this.setState({ subscriptionOn: !this.state.subscriptionOn })
  }

  public render() {
    const { classes } = this.props
    return (
      <div key={this.props.channel_id}>
        <Link href={`/channels?id=${this.props.channel_id}`}>
          <ListItem button>
            <ListItemText secondary={this.props.channel_name} />
            <Tooltip
              onOpen={() => this.setState({ subscriptionTooltipOpen: true })}
              onClose={() => this.setState({ subscriptionTooltipOpen: false })}
              TransitionComponent={Zoom}
              title={`${
                this.state.subscriptionOn ? "Unsubscribe from" : "Subscribe to"
              } channel`}
            >
              <IconButton
                className={classes.listButton}
                aria-label="Subscription"
                onClick={this.handleSubscriptionClick}
              >
                {this.state.subscriptionOn ? <Star /> : <StarBorder />}
              </IconButton>
            </Tooltip>
          </ListItem>
        </Link>
      </div>
    )
  }
}

export default withStyles(styles)(ChannelItem)
