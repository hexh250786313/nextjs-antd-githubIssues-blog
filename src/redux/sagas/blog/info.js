import { take, put, fork } from 'redux-saga/effects'
import {
  FETCH_BLOG_INFO,
} from '../../../constants/ActionTypes'
import {
  fetchBlogInfoFail,
  fetchBlogInfoSuccess,
} from '../../actions/blog'
import api from '../../../constants/ApiUrlForBE'
import nextFetch from '../../../core/nextFetch'

export function* fetchBlogInfo() {
  while (true) {
    yield take(FETCH_BLOG_INFO)
    try {
      const { open_issues_count: openIssuesCount } = yield nextFetch.get(
        api.getGitHub,
      ) || {}
      yield put(fetchBlogInfoSuccess({ openIssuesCount }))
    } catch (e) {
      yield put(fetchBlogInfoFail())
    }
  }
}

export default [fork(fetchBlogInfo)]
