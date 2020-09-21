import { take, put, fork } from 'redux-saga/effects'
import { FETCH_BLOG_INFO } from '@/constants/ActionTypes'
import {
  fetchBlogInfoFail,
  fetchBlogInfoSuccess,
} from '@/redux/actions/blog'
import api from '@/constants/ApiUrlForBE'
import nextFetch from '@/core/nextFetch'

export function* fetchBlogInfo() {
  while (true) {
    yield take(FETCH_BLOG_INFO)
    try {
      const blogInfo = yield nextFetch.get(api.getGitHub)
      yield put(fetchBlogInfoSuccess({ ...blogInfo }))
    } catch (e) {
      yield put(fetchBlogInfoFail())
    }
  }
}

export default [fork(fetchBlogInfo)]
