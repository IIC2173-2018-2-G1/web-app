import React from "react"
import {
  WithStyles,
  createStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles"
import classNames from "classnames"
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
      boxSizing: "border-box",
      height: "100%",
      width: "calc(100vw - 240px)",
      overflow: "scroll",
    },
  })

export interface LayoutProps extends WithStyles<typeof styles> {
  noSideBar?: boolean
  className?: string
}

export interface LayoutState {}

class Layout extends React.Component<LayoutProps, LayoutState> {
  render() {
    const { classes, noSideBar } = this.props
    return (
      <div className={classes.root}>
        {noSideBar ? undefined : <SideBar />}
        <div className={classNames(classes.content, this.props.className)}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Layout)
