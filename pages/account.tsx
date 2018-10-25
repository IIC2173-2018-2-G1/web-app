import React from "react"
import Layout from "../src/components/Layout"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import Paper from "@material-ui/core/Paper"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"
import NotificationsActive from "@material-ui/icons/NotificationsActive"
import NotificationsOff from "@material-ui/icons/NotificationsOff"
import Zoom from "@material-ui/core/Zoom"
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles"

const styles = (theme: Theme) =>
  createStyles({
    row: {
      display: "flex",
      justifyContent: "center",
    },
    bigAvatar: {
      width: 120,
      height: 120,
    },
    layout: {
      width: "auto",
      display: "block", // Fix IE11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      marginBottom: theme.spacing.unit * 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
        .spacing.unit * 3}px`,
    },
    avatar: {
      borderRadius: theme.shape.borderRadius,
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
    channelList: {
      minHeight: 300,
      maxHeight: "70%",
      minWidth: 250,
      overflow: "auto",
      backgroundColor: theme.palette.background.paper,
    },
    listButton: {
      position: "absolute",
      top: "50%",
      marginTop: -16,
      zIndex: 100,
      padding: 3,
      left: 180,
    },
  })

export interface AccountPageProps extends WithStyles<typeof styles> {}

export interface AccountPageState {
  email: string
  username: string
  password: string
  password_confirmation: string
  channelSubscriptions: {
    channel_id: number
    channel_name: string
    notificationsOn: boolean
    notificationTooltipOpen: boolean
  }[]
}

const channelSubscriptions: {
  channel_id: number
  channel_name: string
  notificationsOn: boolean
  notificationTooltipOpen: boolean
}[] = [
  {
    channel_id: 1,
    channel_name: "channel one",
    notificationsOn: true,
    notificationTooltipOpen: false,
  },
  {
    channel_id: 2,
    channel_name: "channel two",
    notificationsOn: false,
    notificationTooltipOpen: false,
  },
  {
    channel_id: 3,
    channel_name: "channel three",
    notificationsOn: true,
    notificationTooltipOpen: false,
  },
  {
    channel_id: 4,
    channel_name: "channel four",
    notificationsOn: false,
    notificationTooltipOpen: false,
  },
  {
    channel_id: 5,
    channel_name: "channel five",
    notificationsOn: true,
    notificationTooltipOpen: false,
  },
  {
    channel_id: 6,
    channel_name: "channel six",
    notificationsOn: false,
    notificationTooltipOpen: false,
  },
  {
    channel_id: 7,
    channel_name: "channel seven",
    notificationsOn: true,
    notificationTooltipOpen: false,
  },
  {
    channel_id: 8,
    channel_name: "channel eight",
    notificationsOn: false,
    notificationTooltipOpen: false,
  },
  {
    channel_id: 9,
    channel_name: "channel nine",
    notificationsOn: true,
    notificationTooltipOpen: false,
  },
  {
    channel_id: 10,
    channel_name: "channel ten",
    notificationsOn: false,
    notificationTooltipOpen: false,
  },
]

class AccountPage extends React.Component<AccountPageProps, AccountPageState> {
  state = {
    email: "dacasas@uc.cl",
    username: "dacasas",
    password: "",
    password_confirmation: "",
    channelSubscriptions,
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("email: ", this.state.email)
    console.log("username: ", this.state.username)
    console.log("password: ", this.state.password)
    console.log("password_confirmation: ", this.state.password_confirmation)
    console.log("valid: ", this.validateForm())
  }

  validateForm = () => {
    return (
      this.state.email.length > 0 &&
      this.state.username.length > 0 &&
      this.validatePasswords()
    )
  }

  validatePasswords = () => {
    return (
      this.state.password.length > 0 &&
      this.state.password_confirmation.length > 0 &&
      this.state.password_confirmation === this.state.password
    )
  }

  handleChangePass = (password: string) => {
    this.setState({ password })
  }

  handleChangePassConfirmation = (password_confirmation: string) => {
    this.setState({ password_confirmation })
  }

  handleChangeEmail = (email: string) => {
    this.setState({ email })
  }

  handleChangeUsername = (username: string) => {
    this.setState({ username })
  }

  handleNotificationClick = (e: React.MouseEvent, channel_id: number) => {
    // TODO Cambiar estado de la notificacion
    e.preventDefault()
  }

  getInitials = () => {
    return this.state.username
      .split(/\s+/)
      .reduce((prev, curr) => prev + curr[0].toUpperCase(), "")
  }

  render() {
    const { classes } = this.props
    return (
      <Layout>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Subscriptions
            </Typography>
            <List className={classes.channelList}>
              {this.state.channelSubscriptions.map(subscription => (
                <ListItem key={subscription.channel_id} button={false}>
                  <ListItemText secondary={subscription.channel_name} />
                  <Tooltip
                    onOpen={() => (subscription.notificationTooltipOpen = true)}
                    onClose={() =>
                      (subscription.notificationTooltipOpen = false)
                    }
                    TransitionComponent={Zoom}
                    title={`${
                      subscription.notificationsOn ? "Disable" : "Enable"
                    } notifications`}
                  >
                    <IconButton
                      className={classes.listButton}
                      aria-label="Notifications"
                      onClick={(e: React.MouseEvent) =>
                        this.handleNotificationClick(e, subscription.channel_id)
                      }
                    >
                      {subscription.notificationsOn ? (
                        <NotificationsActive />
                      ) : (
                        <NotificationsOff />
                      )}
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </Paper>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Account information
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  value={this.state.email}
                  onChange={e => this.handleChangeEmail(e.target.value)}
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  value={this.state.username}
                  onChange={e => this.handleChangeUsername(e.target.value)}
                  name="username"
                  autoComplete="username"
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={e => this.handleChangePass(e.target.value)}
                  autoComplete="current-password"
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password_confirmation">
                  Password confirmation
                </InputLabel>
                <Input
                  name="password_confirmation"
                  type="password"
                  id="password_confirmation"
                  value={this.state.password_confirmation}
                  onChange={e =>
                    this.handleChangePassConfirmation(e.target.value)
                  }
                  autoComplete="current-password"
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Save Changes
              </Button>
            </form>
          </Paper>
        </main>
      </Layout>
    )
  }
}

export default withStyles(styles)(AccountPage)
