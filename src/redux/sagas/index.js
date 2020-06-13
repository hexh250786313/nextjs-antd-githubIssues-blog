import { all } from 'redux-saga/effects';
import postSagas from './post/index';

export default function* rootSagas() {
  yield all([...postSagas]);
}
