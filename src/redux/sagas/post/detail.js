import fetch from 'isomorphic-unfetch';
import { take, put, fork } from 'redux-saga/effects';
import { FETCH_POST_DETAIL } from '../../../constants/ActionTypes';
import {
  fetchPostDetailFail,
  fetchPostDetailSuccess,
} from '../../actions/post';
import api from '../../../constants/ApiUrlForBE';
/**
 * postDetail saga
 */
export function* fetchPostDetail() {
  while (true) {
    const { payload: { number: order = '0' } } = yield take(FETCH_POST_DETAIL);
    try {
      const res = yield fetch(`${api.getGitHubIssues}/${order}`);
      const data = yield res.json();
      yield put(fetchPostDetailSuccess(data));
    } catch (e) {
      yield put(fetchPostDetailFail());
    }
  }
}

export default [fork(fetchPostDetail)];
