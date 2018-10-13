import Document, { Head, Main, NextScript } from "next/document"
import { NextContext } from "next"

export default class MyDocument extends Document<NextContext> {
  render() {
    return (
      <html>
        <Head>
          <title>Arquitran Communications</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <style>{`body { height: 100vh; }`}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <footer />
      </html>
    )
  }
}
