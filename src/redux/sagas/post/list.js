// import fetch from 'isomorphic-unfetch';
import { take, put, fork } from 'redux-saga/effects';
import { FETCH_POST_LIST } from '../../../constants/ActionTypes';
import { fetchPostListFail, fetchPostListSuccess } from '../../actions/post';
import api from '../../../constants/ApiUrlForBE';
import nextFetch from '../../../core/nextFetch';
// import { trackPromise } from 'react-promise-tracker';

/**
 * postList saga
 */
export function * fetchPostList () {
  while (true) {
    const { payload } = yield take(FETCH_POST_LIST);
    try {
      // const res = yield trackPromise(fetch(api.getGitHubIssues));
      // const res = yield fetch(api.getGitHubIssues);
      // const res = yield nextFetch()
      // let data = yield res.json();
      const list = yield nextFetch.get(api.getGitHubIssues, { query: payload });
      const { open_issues_count: openIssuesCount } = yield nextFetch.get(
        api.getGitHub,
      ) || {};
      // data = data.filter(item => {
      //   const { labels } = item;
      //   return labels && labels.some(label => label.name === 'blog');
      // });
      console.log(openIssuesCount);
      yield put(
        fetchPostListSuccess({
          list,
          openIssuesCount,
        }),
      );
    } catch (e) {
      yield put(fetchPostListFail());
    }
  }
}

export default [fork(fetchPostList)];
