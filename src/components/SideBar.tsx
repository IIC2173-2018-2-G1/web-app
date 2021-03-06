import React from "react"
import { inject, observer } from "mobx-react"
import Link from "next/link"
import Router from "next/router"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListSubheader from "@material-ui/core/ListSubheader"
import Drawer from "@material-ui/core/Drawer"
import NotificationsActive from "@material-ui/icons/NotificationsActive"
import NotificationsOff from "@material-ui/icons/NotificationsOff"
import AddCircleOutline from "@material-ui/icons/AddCircleOutline"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import {
  WithStyles,
  createStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import Tooltip from "@material-ui/core/Tooltip"
import Zoom from "@material-ui/core/Zoom"
import ChannelItem from "./ChannelItem"
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
      backgroundColor: theme.palette.background.paper,
    },
    listHeader: {
      backgroundColor: "inherit",
    },
  })

export interface SideBarProps extends WithStyles<typeof styles> {
  channelStore?: ChannelStore
  userStore?: UserStore
}

export interface SideBarState {
  notificationsOn: boolean
  notificationTooltipOpen: boolean
}

@inject("channelStore")
@inject("userStore")
@observer
class SideBar extends React.Component<SideBarProps, SideBarState> {
  state = {
    notificationsOn: false,
    notificationTooltipOpen: false,
  }

  handleUsernameClick = () => {
    if (!this.state.notificationTooltipOpen) {
      Router.push("/account")
    }
  }

  handleNotificationClick = () => {
    this.setState({ notificationsOn: !this.state.notificationsOn })
  }

  render() {
    const { classes } = this.props
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <ListItem button onClick={this.handleUsernameClick}>
          <div className={classes.container}>
            <ListItemText
              primary={this.props.userStore.currentUser.username}
              secondary={
                this.props.userStore.currentUser.first_name +
                " " +
                this.props.userStore.currentUser.last_name
              }
            />
            <Tooltip
              onOpen={() => this.setState({ notificationTooltipOpen: true })}
              onClose={() => this.setState({ notificationTooltipOpen: false })}
              TransitionComponent={Zoom}
              title={`${
                this.state.notificationsOn ? "Disable" : "Enable"
              } notifications`}
            >
              <IconButton
                className={classes.listButton}
                aria-label="Notifications"
                onClick={this.handleNotificationClick}
              >
                {this.state.notificationsOn ? (
                  <NotificationsActive />
                ) : (
                  <NotificationsOff />
                )}
              </IconButton>
            </Tooltip>
          </div>
        </ListItem>
        <Divider />
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
            <ChannelItem
              key={channel.id}
              channel_id={channel.id}
              channel_name={channel.name}
            />
          ))}
        </List>
        <Divider />
        <ListSubheader>
          <Link href="/hashtags">
            <Tooltip title="Search for messages with hashtags">
              <span className={classes.clickableText}>Hashtags</span>
            </Tooltip>
          </Link>
        </ListSubheader>
      </Drawer>
    )
  }
}

export default withStyles(styles)(SideBar)
