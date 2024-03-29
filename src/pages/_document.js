// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <base target='_blank' />
        <Head>
          <link
            rel='stylesheet'
            href='https://proxy.hexh.xyz/proxy/https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css'
          ></link>
          <style>
            {`
            body {
              position: absolute;
              top: 0;
            }
          `}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
