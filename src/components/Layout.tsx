import React from "react"
import {
  WithStyles,
  createStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles"
import SideBar from "./SideBar"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      zIndex: 1,
      overflow: "hidden",
      display: "flex",
      width: "100%",
      height: "100vh",
    },
    content: {
      position: "relative",
      padding: theme.spacing.unit * 3,
    },
  })

export interface LayoutProps extends WithStyles<typeof styles> {
  noSideBar?: boolean
}

export interface LayoutState {}

class Layout extends React.Component<LayoutProps, LayoutState> {
  render() {
    const { classes, noSideBar } = this.props
    return (
      <div className={classes.root}>
        {noSideBar ? undefined : <SideBar />}
        <div className={classes.content}>{this.props.children}</div>
      </div>
    )
  }
}

export default withStyles(styles)(Layout)
