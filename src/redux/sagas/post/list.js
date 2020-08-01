import { take, put, fork, select } from 'redux-saga/effects';
import { FETCH_POST_LIST } from '../../../constants/ActionTypes';
import {
  fetchPostListFail,
  fetchPostListSuccess,
  saveQueryParams,
} from '../../actions/post';
import api from '../../../constants/ApiUrlForBE';
import nextFetch from '../../../core/nextFetch';

/**
 * postList saga
 */
export function* fetchPostList() {
  while (true) {
    const { payload: currentQueryParams } = yield take(FETCH_POST_LIST);
    const prevQueryParams = yield select(state => state.post.query);
    const nextQueryParams = {
      ...prevQueryParams,
      ...currentQueryParams,
    };
    try {
      const list = yield nextFetch.get(api.getGitHubIssues, {
        query: nextQueryParams,
      });
      yield put(fetchPostListSuccess(list));
    } catch (e) {
      yield put(fetchPostListFail());
    } finally {
      yield put(saveQueryParams(nextQueryParams));
    }
  }
}
export default [fork(fetchPostList)];
