import { all } from 'redux-saga/effects'
import postSagas from './post'
import globalSagas from './global'
import homeSagas from './home'
import aboutSagas from './about'
import searchSagas from './search'

export default function * rootSagas () {
  yield all([
    ...postSagas,
    ...globalSagas,
    ...homeSagas,
    ...aboutSagas,
    ...searchSagas
  ])
}
