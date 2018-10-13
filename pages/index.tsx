import React from "react"
import SideBar from "../src/components/SideBar"

export interface MainPageProps {}

export interface MainPageState {}

class MainPage extends React.Component<MainPageProps, MainPageState> {
  render() {
    return (
      <React.Fragment>
        <SideBar />
      </React.Fragment>
    )
  }
}

export default MainPage
