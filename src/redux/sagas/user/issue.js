import fetch from 'isomorphic-unfetch';
import { take, put, fork } from 'redux-saga/effects';
import { FETCH_ISSUE } from '../../../constants/ActionTypes';
import {
  fetchUserListFail,
  fetchIssueSuccess,
} from '../../actions/user';
import api from '../../../constants/ApiUrlForBE';
/**
 * userList saga
 */
export function* fetchIssue(order = '1') {
  while (true) {
    yield take(FETCH_ISSUE);
    try {
      const issuesRes = yield fetch(`${api.getGitHubIssues}/${order}`);
      const issuesList = yield issuesRes.json();
      yield put(fetchIssueSuccess(issuesList));
    } catch (e) {
      yield put(fetchUserListFail());
    }
  }
}

export default [fork(fetchIssue)];
