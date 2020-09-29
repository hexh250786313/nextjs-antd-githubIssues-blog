import { take, put, fork, select, call, takeEvery } from 'redux-saga/effects'
import { FETCH_POST_LIST } from '@/constants/ActionTypes'
import {
  fetchPostListFail,
  fetchPostListSuccess,
  saveQueryParams,
  getPostsAmountSuccess,
} from '@/redux/actions/post'
import api from '@/constants/ApiUrlForBE'
import nextFetch from '@/core/nextFetch'

const fetchList = query => {
  return nextFetch.get(api.searchGitHubIssue, { query })
}

/**
 * postList saga
 */
function* fetchPostList() {
  // 如果要用 tabkeEvery，则不能用 while(true)
  while (true) {
    const { payload: nextQueryParams, callback } = yield take(FETCH_POST_LIST)
    const prevQueryParams = yield select(state => state.post.query)
    const query = {
      ...prevQueryParams,
      ...nextQueryParams,
    }
    try {
      const res = yield call(fetchList, query)
      const { total_count, items } = res
      if (!!callback) {
        yield call(() => {
          callback(res)
        })
      }
      yield put(fetchPostListSuccess(items))
      yield put(getPostsAmountSuccess(total_count))
    } catch (e) {
      yield put(fetchPostListFail())
    } finally {
      yield put(saveQueryParams(query))
    }
  }
}

function* watchFetchPostList() {
  // const { payload: nextQueryParams, callback } = yield take(FETCH_POST_LIST)
  yield takeEvery(FETCH_POST_LIST, fetchPostList)
}

export default [fork(fetchPostList)]
// export default [fork(watchFetchPostList)]
