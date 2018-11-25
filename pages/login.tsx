import React from "react"
import { inject, observer } from "mobx-react"
import Layout from "../src/components/Layout"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import LockIcon from "@material-ui/icons/LockOutlined"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { UserStore } from "../src/stores/UserStore"
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles"
import Link from "next/link"
import Router from "next/router"

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
    bottomText: {
      marginTop: theme.spacing.unit * 2,
    },
    link: {
      color: theme.palette.primary.light,
      "&:hover": {
        color: theme.palette.getContrastText(theme.palette.background.default),
        cursor: "pointer",
      },
    },
  })

export interface LoginPageProps extends WithStyles<typeof styles> {
  userStore?: UserStore
}

export interface LoginPageState {
  email: string
  password: string
}

@inject("userStore")
@observer
class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  state = {
    email: "",
    password: "",
  }

  handleSubmit = async event => {
    event.preventDefault()
    if (this.validateForm()) {
      const response = await this.props.userStore.login(
        this.state.email,
        this.state.password,
      )
      if (response.status == 200) {
        Router.push("/")
        window.location.reload()
      } else {
        alert("error when logging in")
      }
    } else {
      // TODO Show errors
    }
  }

  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0
  }

  handleChangePass = (password: string) => {
    this.setState({ password })
  }

  handleChangeEmail = (email: string) => {
    this.setState({ email })
  }

  render() {
    const { classes } = this.props

    return (
      <Layout noSideBar pageTitle="Login">
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Log in
              </Button>
            </form>
            <Typography className={classes.bottomText} component="p">
              Don't have an account yet?
            </Typography>
            <Link href={"/sign-up"}>
              <Typography className={classes.link}>
                Create an account!
              </Typography>
            </Link>
          </Paper>
        </main>
      </Layout>
    )
  }
}

export default withStyles(styles)(LoginPage)
