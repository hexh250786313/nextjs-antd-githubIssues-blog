import { take, put, fork, select, call } from 'redux-saga/effects'
import { FETCH_SEARCH } from '@/constants/ActionTypes'
import { saveSearch, fetchSearchFail } from '@/redux/actions/search'
import { handleHeaderChange } from '@/redux/actions/layout'
import { saveFetchedList } from '@/redux/actions/post.js'
import api from '@/constants/ApiUrlForBE'
import nextFetch from '@/core/nextFetch'
import { indexPic } from '@/constants/ConstTypes.js'

const fetchList = query => {
  return nextFetch.get(api.searchGitHubIssue, { query })
}

/**
 * search saga
 */
function* fetchSearch() {
  // 如果要用 tabkeEvery，则不能用 while(true)
  while (true) {
    const { payload: nextQueryParams, callback } = yield take(FETCH_SEARCH)
    const prevQueryParams = yield select(state => state.search.query)

    const query = {
      ...prevQueryParams,
      ...nextQueryParams,
    }
    let total_count = 0
    let items = []
    try {
      let res = {}
      const cache = sessionStorage.getItem(query.q + query.page)
      if (!!cache) {
        res = yield call(JSON.parse, cache)
      } else {
        res = yield call(fetchList, query)
      }
      total_count = res.total_count
      items = res.items

      if (!Array.isArray(items)) {
        throw new Error()
      }

      const nextState = {
        total_count,
        items,
        query,
        loading: false,
      }

      if (!cache) {
        // 这个接口有请求次数限制，一小时 30 次，因此做缓存
        sessionStorage.setItem(
          query.q + query.page,
          JSON.stringify({ items, total_count }),
        )
      }

      yield put(saveFetchedList(items))
      yield put(saveSearch(nextState))
    } catch (e) {
      yield put(fetchSearchFail())
    } finally {
      if (!!callback) {
        yield call(() => {
          setTimeout(() => {
            callback()
          })
        })
      }
      yield put(
        handleHeaderChange({
          title: `About ${total_count} results`,
          pic: indexPic,
        }),
      )
    }
  }
}

export default [fork(fetchSearch)]
