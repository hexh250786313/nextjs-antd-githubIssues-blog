import App from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import createStore from '@/redux/store'
import Layout from '@/components/Layout'
import '../../assets/self-styles.less'
import Router from 'next/router'
import NProgress from 'nprogress' // nprogress module
import '../../assets/progress.less' // styles of nprogress

const progressStartEvent = () => {
  NProgress.start()
}

const progressDoneEvent = () => {
  NProgress.done()
}

const toTopEvent = path => {
  // if (path.match(/^\/about/) || (path.match(/^\/post\/\d/) && window)) {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  // }
  NProgress.done()
}

class NextApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }

    return { pageProps }
  }

  componentDidMount () {
    // const {
    //   post: {
    //     list: {
    //       query: { page },
    //     },
    //   },
    // } = this.props.store.getState()

    // Binding events.
    Router.events.on('routeChangeStart', progressStartEvent)
    Router.events.on('routeChangeComplete', toTopEvent)
    Router.events.on('routeChangeError', progressDoneEvent)
  }

  componentWillUnmount () {
    Router.events.off('routeChangeStart', progressStartEvent)
    Router.events.off('routeChangeComplete', toTopEvent)
    Router.events.off('routeChangeError', progressDoneEvent)
  }

  render () {
    const { Component, pageProps, store, router } = this.props
    return (
      <>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=0' />
          <meta charSet='utf-8' />
          <title>hexh's blog</title>
          <link rel='shortcut icon' href='/tama.ico' type='image/ico' />
          <link rel='manifest' href='/manifest.webmanifest' />
          <style jsx global>
            {`
              * {
                margin: 0;
                padding: 0;
              }
              body {
                font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei',
                  '微软雅黑', Arial, sans-serif;
              }
            `}
          </style>
        </Head>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} router={router} />
          </Layout>
        </Provider>
      </>
    )
  }
}

export default withRedux(createStore)(withReduxSaga({ async: true })(NextApp))
