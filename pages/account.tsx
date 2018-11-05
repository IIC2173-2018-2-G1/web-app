import React from "react"
import { inject, observer } from "mobx-react"
import Layout from "../src/components/Layout"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { UserStore } from "../src/stores/UserStore"
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
  })

export interface AccountPageProps extends WithStyles<typeof styles> {
  userStore?: UserStore
}

export interface AccountPageState {
  email: string
  username: string
  firstName: string
  lastName: string
  password: string
  password_confirmation: string
}

@inject("userStore")
@observer
class AccountPage extends React.Component<AccountPageProps, AccountPageState> {
  state = {
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    password_confirmation: "",
  }

  componentWillMount() {
    if (this.props.userStore.currentUser != null) {
      this.setState({
        email: this.props.userStore.currentUser.email,
        username: this.props.userStore.currentUser.username,
        firstName: this.props.userStore.currentUser.firstName,
        lastName: this.props.userStore.currentUser.lastName,
      })
    }
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    this.props.userStore.updateUser({
      email: this.state.email,
      username: this.state.username,
      lastName: this.state.lastName,
      firstName: this.state.firstName,
    })
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

  handleChangeFirstName = (firstName: string) => {
    this.setState({ firstName })
  }

  handleChangeLastName = (lastName: string) => {
    this.setState({ lastName })
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
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Input
                  id="firstName"
                  value={this.state.firstName}
                  onChange={e => this.handleChangeFirstName(e.target.value)}
                  name="firstName"
                  autoComplete="firstName"
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <Input
                  id="lastName"
                  value={this.state.lastName}
                  onChange={e => this.handleChangeLastName(e.target.value)}
                  name="lastName"
                  autoComplete="lastName"
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
