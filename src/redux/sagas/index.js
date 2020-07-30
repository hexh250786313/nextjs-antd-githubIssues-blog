import { all } from 'redux-saga/effects';
import postSagas from './post/index';
import blogSagas from './blog/index';

export default function* rootSagas() {
  yield all([...postSagas, ...blogSagas]);
}
