import React from "react"
import Layout from "../src/components/Layout"

export interface MainPageProps {}

export interface MainPageState {}

class MainPage extends React.Component<MainPageProps, MainPageState> {
  render() {
    return <Layout />
  }
}

export default MainPage
