import fetch from 'isomorphic-unfetch';
import { take, put, fork } from 'redux-saga/effects';
import { FETCH_POST_DETAIL } from '../../../constants/ActionTypes';
import {
  fetchPostDetailFail,
  fetchPostDetailSuccess,
} from '../../actions/post';
import api from '../../../constants/ApiUrlForBE';
// import { trackPromise } from 'react-promise-tracker';

/**
 * postDetail saga
 */
export function* fetchPostDetail() {
  while (true) {
    const {
      payload: { number = '0' },
    } = yield take(FETCH_POST_DETAIL);
    try {
      // const res = yield trackPromise(fetch(`${api.getGitHubIssues}/${number}`));
      const res = yield fetch(`${api.getGitHubIssue}/${number}`);
      const detail = yield res.json();
      yield put(fetchPostDetailSuccess(detail));
    } catch (e) {
      yield put(fetchPostDetailFail());
    }
  }
}

export default [fork(fetchPostDetail)];
