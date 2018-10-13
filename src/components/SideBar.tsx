import React from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListSubheader from "@material-ui/core/ListSubheader"
import Drawer from "@material-ui/core/Drawer"
import NotificationsActive from "@material-ui/icons/NotificationsActive"
import NotificationsOff from "@material-ui/icons/NotificationsOff"
import AddCircleOutline from "@material-ui/icons/AddCircleOutline"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import { WithStyles, createStyles, withStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import Tooltip from "@material-ui/core/Tooltip"
import Zoom from "@material-ui/core/Zoom"

const styles = theme =>
  createStyles({
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: 240,
      height: "100vh",
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
        color: "#aaaaaa",
      },
    },
    channelList: {
      maxHeight: "40vh",
      overflow: "auto",
      backgroundColor: theme.palette.background.paper,
    },
    listHeader: {
      backgroundColor: "inherit",
    },
  })

export interface SideBarProps extends WithStyles<typeof styles> {}

export interface SideBarState {
  notificationsOn: boolean
  notificationTooltipOpen: boolean
}

const channelNames: string[] = [
  "channel one",
  "channel two",
  "channel three",
  "channel four",
  "channel five",
  "channel six",
  "channel seven",
  "channel eight",
  "channel nine",
  "channel ten",
]

class SideBar extends React.Component<SideBarProps, SideBarState> {
  state = {
    notificationsOn: false,
    notificationTooltipOpen: false,
  }

  handleUsernameClick = () => {
    if (!this.state.notificationTooltipOpen) {
      console.log("user clicked!")
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
            <ListItemText primary="Username" secondary="Name Lastname" />
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
              <Tooltip
                title="Browse all channels"
                TransitionComponent={Zoom}
                placement="bottom-start"
              >
                <span className={classes.clickableText}>Channels</span>
              </Tooltip>
              <Tooltip title="Create a channel" TransitionComponent={Zoom}>
                <IconButton
                  className={classes.listButton}
                  aria-label="CreateChannel"
                >
                  <AddCircleOutline />
                </IconButton>
              </Tooltip>
            </div>
          </ListSubheader>
          {channelNames.map(name => (
            <ListItem button key={name}>
              <ListItemText secondary={name} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    )
  }
}

export default withStyles(styles)(SideBar)
