import React from "react"
import Layout from "../src/components/Layout"
import Typography from "@material-ui/core/Typography"
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles"

const styles = (theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing.unit * 3,
      textAlign: "center",
    },
  })
export interface MainPageProps extends WithStyles<typeof styles> {}

export interface MainPageState {}

class MainPage extends React.Component<MainPageProps, MainPageState> {
  render() {
    const { classes } = this.props

    return (
      <Layout>
        <Typography className={classes.title} component="h1" variant="h4">
          Select a channel to start!
        </Typography>
      </Layout>
    )
  }
}

export default withStyles(styles)(MainPage)
