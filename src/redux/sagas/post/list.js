import { take, put, fork, select, call, takeEvery } from 'redux-saga/effects'
import { FETCH_POST_LIST } from '@/constants/ActionTypes'
import { fetchPostListFail, saveListState } from '@/redux/actions/post'
import api from '@/constants/ApiUrlForBE'
import nextFetch from '@/core/nextFetch'
import { listQuery } from '@/constants/ConstTypes'

const fetchList = query => {
  return nextFetch.get(api.getGitHubIssue, { query })
}

/**
 * postList saga
 */
function* fetchPostList() {
  // 如果要用 tabkeEvery，则不能用 while(true)
  while (true) {
    const { payload: nextQueryParams, callback } = yield take(FETCH_POST_LIST)
    let { query: prevQueryParams, total_count, cacheList } = yield select(
      state => state.post.list,
    )
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

      console.log(cacheList)

      const nextState = {
        total_count,
        items,
        query,
        loading: false,
        cacheList
      }

      // nextState.cacheList = cacheList
      //   .concat(items)
      //   .filter(
      //     (item, index, self) =>
      //       index === self.findIndex(T => T.number === item.number),
      //   )
      // console.log(`更新缓存列表`, nextState.cacheList)

      yield put(saveListState(nextState))
    } catch (e) {
      yield put(fetchPostListFail())
    } finally {
      if (!!callback) {
        yield call(() => {
          setTimeout(() => {
            callback()
          })
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
