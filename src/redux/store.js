import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/index'
import rootSaga from './sagas/index'
import postListMiddleware from '@/middlewares/client/post/list'
import postDetailMiddleware from '@/middlewares/client/post/detail'
import blogInfoMiddleware from '@/middlewares/client/blog/info'

const bindMiddleware = middleware => {
  // add route middleware
  middleware.push(postListMiddleware)
  middleware.push(postDetailMiddleware)
  middleware.push(blogInfoMiddleware)
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    // development use logger
    // const { logger } = require('redux-logger')
    // middleware.push(logger)
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware]),
  )

  store.sagaTask = sagaMiddleware.run(rootSaga)

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () =>
      // eslint-disable-next-line global-require
      store.replaceReducer(require('./reducers').default),
    )
  }

  return store
}

export default configureStore
