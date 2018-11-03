import React from "react"
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

export interface CreateChannelPageProps extends WithStyles<typeof styles> {}

export interface CreateChannelPageState {
  channelName: string
}

class CreateChannelPage extends React.Component<
  CreateChannelPageProps,
  CreateChannelPageState
> {
  state = {
    channelName: "",
  }

  handleChangeChannelName = (channelName: string) => {
    this.setState({ channelName })
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Create channel with name: ${this.state.channelName}`)
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

export default withStyles(styles)(CreateChannelPage)
