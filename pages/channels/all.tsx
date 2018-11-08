import React from "react"
import { inject, observer } from "mobx-react"
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
import { ChannelStore } from "../../src/stores/ChannelStore"
import { UserStore } from "../../src/stores/UserStore"

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
      backgroundColor: theme.palette.background.default,
    },
    listHeader: {
      backgroundColor: "inherit",
    },
  })

export interface BrowseChannelsPageProps extends WithStyles<typeof styles> {
  channelStore?: ChannelStore
  userStore?: UserStore
}

export interface BrowseChannelsPageState {}

@inject("channelStore")
@inject("userStore")
@observer
class BrowseChannelsPage extends React.Component<
  BrowseChannelsPageProps,
  BrowseChannelsPageState
> {
  componentWillMount() {
    this.props.channelStore.setChannelList(this.props.userStore.currentToken)
  }

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
          {this.props.channelStore.currentChannelList.map(channel => (
            <ChannelItem channel_id={channel.id} channel_name={channel.name} />
          ))}
        </List>
      </Layout>
    )
  }
}

export default withStyles(styles)(BrowseChannelsPage)
