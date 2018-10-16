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
      width: "100vw",
      height: "100vh",
    },
    content: {
      position: "relative",
      height: "100%",
      width: "100%",
      overflow: "scroll",
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
