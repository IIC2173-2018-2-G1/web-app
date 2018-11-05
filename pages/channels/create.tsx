import React from "react"
import { inject, observer } from "mobx-react"
import Layout from "../../src/components/Layout"
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
import { ChannelStore } from "../../src/stores/ChannelStore"
import { UserStore } from "../../src/stores/UserStore"

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

export interface CreateChannelPageProps extends WithStyles<typeof styles> {
  channelStore?: ChannelStore
  userStore?: UserStore
}

export interface CreateChannelPageState {
  channelName: string
  channelDescription: string
}

@inject("channelStore")
@inject("userStore")
@observer
class CreateChannelPage extends React.Component<
  CreateChannelPageProps,
  CreateChannelPageState
> {
  state = {
    channelName: "",
    channelDescription: "",
  }

  handleChangeChannelName = (channelName: string) => {
    this.setState({ channelName })
  }

  handleChangeChannelDescription = (channelDescription: string) => {
    this.setState({ channelDescription })
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.channelStore.addChannel(
      {
        id: null,
        name: this.state.channelName,
        description: this.state.channelDescription,
        subscriptionOn: false,
      },
      this.props.userStore.currentToken,
    )
    this.setState({ channelDescription: "", channelName: "" })
  }

  render() {
    const { classes } = this.props
    return (
      <Layout>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Create new channel
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="channelName">Channel Name</InputLabel>
                <Input
                  id="channelName"
                  value={this.state.channelName}
                  onChange={e => this.handleChangeChannelName(e.target.value)}
                  name="channelName"
                  autoComplete="channelName"
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="channelName">
                  Channel Description
                </InputLabel>
                <Input
                  id="channelDescription"
                  value={this.state.channelDescription}
                  onChange={e =>
                    this.handleChangeChannelDescription(e.target.value)
                  }
                  name="channelDescription"
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create Channel
              </Button>
            </form>
          </Paper>
        </main>
      </Layout>
    )
  }
}

export default withStyles(styles)(CreateChannelPage)
