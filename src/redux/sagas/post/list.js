import { take, put, fork } from 'redux-saga/effects';
import {
  FETCH_POST_LIST,
} from '../../../constants/ActionTypes';
import {
  fetchPostListFail,
  fetchPostListSuccess,
} from '../../actions/post';
import api from '../../../constants/ApiUrlForBE';
import nextFetch from '../../../core/nextFetch';

/**
 * postList saga
 */
export function* fetchPostList() {
  while (true) {
    const { payload } = yield take(FETCH_POST_LIST);
    try {
      const list = yield nextFetch.get(api.getGitHubIssues, { query: payload });
      yield put(fetchPostListSuccess({ list }));
    } catch (e) {
      yield put(fetchPostListFail());
    }
  }
}
export default [fork(fetchPostList)];
