import fetch from 'isomorphic-unfetch';
import { take, put, fork } from 'redux-saga/effects';
import { FETCH_USER_LIST } from '../../../constants/ActionTypes';
import {
  fetchUserListFail,
  // fetchUserListSuccess,
  fetchIssuesListFail,
  fetchIssuesListSuccess,
} from '../../actions/user';
import api from '../../../constants/ApiUrlForBE';
/**
 * userList saga
 */
export function* fetchUserList() {
  while (true) {
    yield take(FETCH_USER_LIST);
    try {
      // const res = yield fetch(api.getUserList);
      const issuesRes = yield fetch(api.getGitHubIssues);
      const issuesList = yield issuesRes.json();
      // const data = yield res.json();
      yield put(fetchIssuesListSuccess(issuesList));
      // yield put(fetchUserListSuccess(data));
    } catch (e) {
      yield put(fetchIssuesListFail());
      yield put(fetchUserListFail());
    }
  }
}

export default [fork(fetchUserList)];
