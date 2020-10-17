import { FETCH_TIMELINE } from '@/constants/ActionTypes'
import api from '@/constants/ApiUrlForBE'
import nextFetch from '@/core/nextFetch'
import { requestFail } from '@/redux/actions/global'
import { fetchTimelineSuccess } from '@/redux/actions/home'
import { saveFetchedList } from '@/redux/actions/post.js'
import { call, fork, put, select, take } from 'redux-saga/effects'

const fetchList = query => {
  return nextFetch.get(api.githubIssuesApi, { query })
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
      yield put(saveFetchedList(list))
    } catch (e) {
      yield put(requestFail('请求首页接口报错，请刷新页面或者联系我'))
    }
  }
}

export default [fork(fetchPostList)]
