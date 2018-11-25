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
  first_name: string
  last_name: string
  password: string
  password_confirmation: string
}

@inject("userStore")
@observer
class AccountPage extends React.Component<AccountPageProps, AccountPageState> {
  state = {
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
  }

  componentWillMount() {
    if (this.props.userStore.currentUser != null) {
      this.setState({
        first_name: this.props.userStore.currentUser.first_name,
        last_name: this.props.userStore.currentUser.last_name,
      })
    }
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    this.props.userStore.updateUser(
      this.state.first_name,
      this.state.last_name,
      this.state.password || undefined
    )
  }

  handleChangePass = (password: string) => {
    this.setState({ password })
  }

  handleChangePassConfirmation = (password_confirmation: string) => {
    this.setState({ password_confirmation })
  }

  handleChangeFirst_name = (first_name: string) => {
    this.setState({ first_name })
  }

  handleChangeLast_name = (last_name: string) => {
    this.setState({ last_name })
  }

  handleLogout = () => {
    this.props.userStore.logout();
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
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="first_name">First Name</InputLabel>
                <Input
                  id="first_name"
                  value={this.state.first_name}
                  onChange={e => this.handleChangeFirst_name(e.target.value)}
                  name="first_name"
                  autoComplete="first_name"
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="last_name">Last Name</InputLabel>
                <Input
                  id="last_name"
                  value={this.state.last_name}
                  onChange={e => this.handleChangeLast_name(e.target.value)}
                  name="last_name"
                  autoComplete="last_name"
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
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
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="password_confirmation">
                  Password confirmation
                </InputLabel>
                <Input
                  disabled={this.state.password.length == 0}
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
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={this.handleLogout}
              >
                Logout
              </Button>
            </form>
          </Paper>
        </main>
      </Layout>
    )
  }
}

export default withStyles(styles)(AccountPage)
