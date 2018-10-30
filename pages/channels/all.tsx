import React from "react"
import Layout from "../../src/components/Layout"
import { List, ListSubheader, Tooltip, IconButton } from "@material-ui/core"
import Link from "next/link"
import AddCircleOutline from "@material-ui/icons/AddCircleOutline"
import ChannelItem from "../../src/components/ChannelItem"
import Zoom from "@material-ui/core/Zoom"
import {
  WithStyles,
  createStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles"

const styles = (theme: Theme) =>
  createStyles({
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: 240,
      height: "100%",
    },
    listButton: {
      position: "absolute",
      top: "50%",
      marginTop: -16,
      zIndex: 100,
      padding: 3,
      left: 180,
    },
    container: {
      position: "relative",
    },
    clickableText: {
      cursor: "pointer",
      paddingRight: 120,
      "&:hover": {
        color: theme.palette.getContrastText(theme.palette.background.paper),
      },
    },
    channelList: {
      minHeight: 100,
      maxHeight: "70%",
      overflow: "auto",
      backgroundColor: theme.palette.background.paper,
    },
    listHeader: {
      backgroundColor: "inherit",
    },
  })

const channelNames: { name: string; id: number }[] = [
  { name: "channel one", id: 1 },
  { name: "channel two", id: 2 },
  { name: "channel three", id: 3 },
  { name: "channel four", id: 4 },
  { name: "channel five", id: 5 },
  { name: "channel six", id: 6 },
  { name: "channel seven", id: 7 },
  { name: "channel eight", id: 8 },
  { name: "channel nine", id: 9 },
  { name: "channel ten", id: 10 },
]

export interface BrowseChannelsPageProps extends WithStyles<typeof styles> {}

export interface BrowseChannelsPageState {}

class BrowseChannelsPage extends React.Component<
  BrowseChannelsPageProps,
  BrowseChannelsPageState
> {
  render() {
    const { classes } = this.props

    return (
      <Layout>
        <List className={classes.channelList}>
          <ListSubheader className={classes.listHeader}>
            <div className={classes.container}>
              <Link href="/channels/all">
                <Tooltip
                  title="Browse all channels"
                  TransitionComponent={Zoom}
                  placement="bottom-start"
                >
                  <span className={classes.clickableText}>Channels</span>
                </Tooltip>
              </Link>
              <Link href="/channels/create">
                <Tooltip title="Create a channel" TransitionComponent={Zoom}>
                  <IconButton
                    className={classes.listButton}
                    aria-label="CreateChannel"
                  >
                    <AddCircleOutline />
                  </IconButton>
                </Tooltip>
              </Link>
            </div>
          </ListSubheader>
          {channelNames.map(channel => (
            <ChannelItem
              key={channel.id}
              channel_id={channel.id}
              channel_name={channel.name}
            />
          ))}
        </List>
      </Layout>
    )
  }
}

export default withStyles(styles)(BrowseChannelsPage)
