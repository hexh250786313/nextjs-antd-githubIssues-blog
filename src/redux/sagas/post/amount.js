import { take, put, fork, select } from 'redux-saga/effects'
import { GET_POSTS_AMOUNT } from '../../../constants/ActionTypes'
import { getPostsAmountSuccess, getPostsAmountFail } from '../../actions/post'
import api from '../../../constants/ApiUrlForBE'
import nextFetch from '../../../core/nextFetch'

/**
 * postAmount saga
 */
export function* func() {
  while (true) {
    const { payload: currentQueryParams } = yield take(GET_POSTS_AMOUNT)
    const prevQueryParams = yield select(state => state.post.query)
    const nextQueryParams = {
      ...prevQueryParams,
      ...currentQueryParams,
    }
    try {
      const list = yield nextFetch.get(api.getGitHubIssues, {
        query: nextQueryParams,
      })
      yield put(getPostsAmountSuccess(list.length))
    } catch (e) {
      yield put(getPostsAmountFail())
    }
  }
}
export default [fork(func)]
