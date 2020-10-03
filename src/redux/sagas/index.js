import { all } from 'redux-saga/effects'
import postSagas from './post'
import blogSagas from './blog'
import homeSagas from './home'
import aboutSagas from './about'
import searchSagas from './search'

export default function* rootSagas() {
  yield all([
    ...postSagas,
    ...blogSagas,
    ...homeSagas,
    ...aboutSagas,
    ...searchSagas,
  ])
}
