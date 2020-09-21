import { take, put, fork, select, call } from 'redux-saga/effects'
import { FETCH_TIMELINE } from '@/constants/ActionTypes'
import {
  fetchTimelineSuccess,
  fetchTimelineFail
} from '@/redux/actions/home'
import api from '@/constants/ApiUrlForBE'
import nextFetch from '@/core/nextFetch'

const fetchList = query => {
  return nextFetch.get(api.getGitHubIssues, { query })
}

/**
 * timeline saga
 */
function* fetchPostList() {
  while (true) {
    const { payload: nextQueryParams, callback } = yield take(FETCH_TIMELINE)
    const prevQueryParams = yield select(state => state.post.query)
    const query = {
      ...prevQueryParams,
      ...nextQueryParams,
    }
    try {
      const list = yield call(fetchList, query)
      if (!!callback) {
        yield call(() => {
          callback(list)
        })
      }
      yield put(fetchTimelineSuccess(list))
    } catch (e) {
      yield put(fetchTimelineFail())
    }
  }
}

export default [fork(fetchPostList)]
