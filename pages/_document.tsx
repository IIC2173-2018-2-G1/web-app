import Document, {
  Head,
  Main,
  NextScript,
  NextDocumentContext,
} from "next/document"
import { PageContext } from "../src/utils/getPageContext"
import * as React from "react"
import flush from "styled-jsx/server"

interface MyDocumentProps {
  pageContext: PageContext
}
export default class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: NextDocumentContext): Promise<any> {
    let pageContext

    const page = ctx.renderPage(Component => {
      const WrappedComponent = props => {
        pageContext = props.pageContext
        return <Component {...props} />
      }
      return WrappedComponent
    })

    return {
      ...page,
      pageContext,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: (
        <React.Fragment>
          <style
            id="jss-server-side"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: pageContext.sheetsRegistry.toString(),
            }}
          />
          {flush() || null}
        </React.Fragment>
      ),
    }
  }

  render() {
    const { pageContext } = this.props
    return (
      <html>
        <body>
          <Head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />
            <meta
              name="theme-color"
              content={pageContext.theme.palette.primary.main}
            />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
            />
          </Head>
          <Main />
          <NextScript />
        </body>
        <footer />
      </html>
    )
  }
}
