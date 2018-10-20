import React from "react"
import Layout from "../src/components/Layout"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles"

const styles = (theme: Theme) =>
  createStyles({
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
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
        .spacing.unit * 3}px`,
    },
    avatar: {
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

export interface SignInPageProps extends WithStyles<typeof styles> {}

export interface SignInPageState {
  email: string
  username: string
  password: string
  password_confirmation: string
}

class SignInPage extends React.Component<SignInPageProps, SignInPageState> {
  state = {
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  }

  handleSubmit = (event: Event) => {
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

  render() {
    const { classes } = this.props

    return (
      <Layout noSideBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign in
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
                Sign in
              </Button>
            </form>
          </Paper>
        </main>
      </Layout>
    )
  }
}

export default withStyles(styles)(SignInPage)
