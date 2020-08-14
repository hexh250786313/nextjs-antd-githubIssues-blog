import { take, put, fork, select, call } from 'redux-saga/effects'
import { FETCH_POST_LIST } from '../../../constants/ActionTypes'
import {
  fetchPostListFail,
  fetchPostListSuccess,
  saveQueryParams,
} from '../../actions/post'
import api from '../../../constants/ApiUrlForBE'
import nextFetch from '../../../core/nextFetch'

/**
 * postList saga
 */
export function* fetchPostList() {
  while (true) {
    const { payload: nextQueryParams, callback } = yield take(FETCH_POST_LIST)
    const prevQueryParams = yield select(state => state.post.query)
    const query = {
      ...prevQueryParams,
      ...nextQueryParams,
    }
    try {
      const list = yield nextFetch.get(api.getGitHubIssues, { query })
      if (!!callback) {
        yield call(() => {
          callback(list)
        })
      }
      yield put(fetchPostListSuccess(list))
    } catch (e) {
      yield put(fetchPostListFail())
    } finally {
      yield put(saveQueryParams(query))
    }
  }
}
export default [fork(fetchPostList)]
