import { FETCH_BLOG_INFO } from '@/constants/ActionTypes'
import api from '@/constants/ApiUrlForBE'
import nextFetch from '@/core/nextFetch'
import { fetchBlogInfoSuccess, requestFail } from '@/redux/actions/global'
import { fork, put, take } from 'redux-saga/effects'

export function* fetchBlogInfo() {
  while (true) {
    yield take(FETCH_BLOG_INFO)
    try {
      const blogInfo = yield nextFetch.get(api.githubInfoApi)
      if (typeof blogInfo.open_issues_count !== `number`) {
        throw new Error()
      }
      yield put(fetchBlogInfoSuccess({ ...blogInfo }))
    } catch (e) {
      yield put(requestFail(`请求博客信息接口错误，请刷新页面或者联系我`))
    }
  }
}

export default [fork(fetchBlogInfo)]
