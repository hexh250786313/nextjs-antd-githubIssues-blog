import { FETCH_POST_LIST } from '@/constants/ActionTypes'
import api from '@/constants/ApiUrlForBE'
import { defaultPic, searchQuery } from '@/constants/ConstTypes'
import nextFetch from '@/core/nextFetch'
import { handleFetchedList } from '@/core/util'
import { requestFail } from '@/redux/actions/global'
import { handleHeaderChange } from '@/redux/actions/layout'
import { saveListState } from '@/redux/actions/post'
import { call, fork, put, select, take, takeEvery } from 'redux-saga/effects'

const fetchList = query => {
  return nextFetch.get(api.githubIssuesApi, { query })
}

const fetchSearch = () => {
  return nextFetch.get(api.githubSearchApi, { query: searchQuery('allPost') })
}

/**
 * postList saga
 */
function * fetchPostList () {
  // 如果要用 tabkeEvery，则不能用 while(true)
  while (true) {
    const { payload: nextQueryParams, callback } = yield take(FETCH_POST_LIST)
    let {
      query: prevQueryParams,
      total_count,
      cacheList,
      fetchedList
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

      if (process.browser) {
        // 如果没有 redux 缓存，则找 sessionStorage 的缓存
        if (!total_count) {
          const cache = JSON.parse(sessionStorage.getItem('total_count'))
          // 如果没有 sessionStorage 的缓存，则请求接口
          if (typeof cache !== 'number') {
            const res = yield call(fetchSearch, query)
            if (typeof res.total_count !== 'number') {
              throw new Error()
            }
            total_count = res.total_count
            sessionStorage.setItem('total_count', JSON.stringify(total_count))
          } else {
            // 如果有 sessionStorage，则直接使用
            total_count = cache
          }
        } else {
          // 如果有 redux 缓存，则更新 sessionStorage 的缓存
          sessionStorage.setItem('total_count', JSON.stringify(total_count))
        }
      } else if (!total_count) {
        // 如果不在浏览器环境，则直接请求接口即可
        const res = yield call(fetchSearch, query)
        if (typeof res.total_count !== 'number') {
          throw new Error()
        }
        total_count = res.total_count
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
        fetchedList: handleFetchedList(fetchedList, items)
      }

      yield put(saveListState(nextState))
      yield put(
        handleHeaderChange({
          title: 'Posts List',
          pic: defaultPic
        })
      )
    } catch (e) {
      yield put(requestFail('请求文章列表接口报错，请刷新页面或者联系我'))
    } finally {
      if (callback) {
        yield call(() => {
          callback()
        })
      }
    }
  }
}

function * watchFetchPostList () {
  // const { payload: nextQueryParams, callback } = yield take(FETCH_POST_LIST)
  yield takeEvery(FETCH_POST_LIST, fetchPostList)
}

export default [fork(fetchPostList)]
// export default [fork(watchFetchPostList)]
