import fetch from 'isomorphic-unfetch';
import { take, put, fork } from 'redux-saga/effects';
import { FETCH_POST_LIST } from '../../../constants/ActionTypes';
import { fetchPostListFail, fetchPostListSuccess } from '../../actions/post';
import api from '../../../constants/ApiUrlForBE';
// import { trackPromise } from 'react-promise-tracker';

/**
 * postList saga
 */
export function* fetchPostList() {
  while (true) {
    yield take(FETCH_POST_LIST);
    try {
      // const res = yield trackPromise(fetch(api.getGitHubIssues));
      const res = yield fetch(api.getGitHubIssues);
      let data = yield res.json();
      // data = data.filter(item => {
      //   const { labels } = item;
      //   return labels && labels.some(label => label.name === 'blog');
      // });
      yield put(fetchPostListSuccess(data));
    } catch (e) {
      yield put(fetchPostListFail());
    }
  }
}

export default [fork(fetchPostList)];
