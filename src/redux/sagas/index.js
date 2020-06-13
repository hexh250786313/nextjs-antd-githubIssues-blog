import { all } from 'redux-saga/effects';
import userSagas from './user/index';
import postSagas from './post/index';

export default function* rootSagas() {
  yield all([...userSagas, ...postSagas]);
}
