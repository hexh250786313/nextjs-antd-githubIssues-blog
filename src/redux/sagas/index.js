import { all } from 'redux-saga/effects'
import postSagas from './post/index'
import blogSagas from './blog/index'
import homeSagas from './home/index'
import aboutSagas from './about/index'

export default function* rootSagas() {
  yield all([...postSagas, ...blogSagas, ...homeSagas
    , ...aboutSagas
  ])
}
