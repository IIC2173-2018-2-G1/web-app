import React from "react"
import App, { Container } from "next/app"
import { MuiThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import JssProvider from "react-jss/lib/JssProvider"
import getPageContext, { PageContext } from "../src/utils/getPageContext"
import { Provider } from "mobx-react"
import { ChannelStore } from "../src/stores/ChannelStore"
import { UserStore } from "../src/stores/UserStore"
import { HashtagStore } from "../src/stores/HashtagStore"

export default class MyApp extends App {
  private pageContext: PageContext
  private channelStore: ChannelStore = new ChannelStore()
  private userStore: UserStore = new UserStore()
  private hashtagStore: HashtagStore = new HashtagStore()

  constructor(props) {
    super(props)
    this.pageContext = getPageContext()
    this.userStore.setCurrentUser()
    this.userStore.setAllUsers()
    this.channelStore.setChannelList()
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
            <Provider
              channelStore={this.channelStore}
              userStore={this.userStore}
              hashtagStore={this.hashtagStore}
            >
              <Component pageContext={this.pageContext} {...pageProps} />
            </Provider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    )
  }
}

