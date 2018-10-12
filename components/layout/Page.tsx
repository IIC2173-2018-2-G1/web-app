import * as React from "react"
import NavBar from "./NavBar"

export interface PageProps {}

export interface PageState {}

class Page extends React.Component<PageProps, PageState> {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container mt-2">{this.props.children}</div>
      </React.Fragment>
    )
  }
}

export default Page
