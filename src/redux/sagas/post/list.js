import fetch from 'isomorphic-unfetch';
import { take, put, fork } from 'redux-saga/effects';
import { FETCH_POST_LIST } from '../../../constants/ActionTypes';
import {
  fetchPostListFail,
  fetchPostListSuccess,
} from '../../actions/post';
import api from '../../../constants/ApiUrlForBE';
/**
 * postList saga
 */
export function* fetchPostList() {
  while (true) {
    yield take(FETCH_POST_LIST);
    try {
      const res = yield fetch(api.getGitHubIssues);
      const data = yield res.json();
      yield put(fetchPostListSuccess(data));
    } catch (e) {
      yield put(fetchPostListFail());
    }
  }
}

export default [fork(fetchPostList)];
