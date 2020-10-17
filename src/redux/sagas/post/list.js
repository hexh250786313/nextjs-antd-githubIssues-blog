import { FETCH_POST_LIST } from '@/constants/ActionTypes'
import api from '@/constants/ApiUrlForBE'
import { defaultPic, listQuery } from '@/constants/ConstTypes'
import nextFetch from '@/core/nextFetch'
import { handleFetchedList } from '@/core/util'
import { requestFail } from '@/redux/actions/global'
import { handleHeaderChange } from '@/redux/actions/layout'
import { saveListState } from '@/redux/actions/post'
import { call, fork, put, select, take, takeEvery } from 'redux-saga/effects'

const fetchList = query => {
  return nextFetch.get(api.githubIssuesApi, { query })
}

/**
 * postList saga
 */
function* fetchPostList() {
  // 如果要用 tabkeEvery，则不能用 while(true)
  while (true) {
    const { payload: nextQueryParams, callback } = yield take(FETCH_POST_LIST)
    let {
      query: prevQueryParams,
      total_count,
      cacheList,
      fetchedList,
    } = yield select(state => state.post.list)
    const query = { ...prevQueryParams, ...nextQueryParams }

    try {
      let items = []
      if (cacheList[query.page]) {
        items = cacheList[query.page]
      } else {
        items = yield call(fetchList, query)
        cacheList[query.page] = items
      }
      if (!total_count) {
        const res = yield call(fetchList, { ...listQuery, per_page: 100000 })
        if (!Array.isArray(res)) {
          throw new Error()
        }
        total_count = res.length
      }

      if (!Array.isArray(items)) {
        throw new Error()
      }

      const nextState = {
        total_count,
        items,
        query,
        loading: false,
        cacheList,
        fetchedList: handleFetchedList(fetchedList, items),
      }

      yield put(saveListState(nextState))
      yield put(
        handleHeaderChange({
          title: `Posts List`,
          pic: defaultPic,
        }),
      )
    } catch (e) {
      yield put(requestFail(`请求文章列表接口报错，请刷新页面或者联系我`))
    } finally {
      if (!!callback) {
        yield call(() => {
          callback()
        })
      }
    }
  }
}

function* watchFetchPostList() {
  // const { payload: nextQueryParams, callback } = yield take(FETCH_POST_LIST)
  yield takeEvery(FETCH_POST_LIST, fetchPostList)
}

export default [fork(fetchPostList)]
// export default [fork(watchFetchPostList)]
