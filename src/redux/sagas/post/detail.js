import fetch from 'isomorphic-unfetch'
import { take, put, fork, select } from 'redux-saga/effects'
import { FETCH_POST_DETAIL } from '@/constants/ActionTypes'
import { fetchPostDetailFail, fetchPostDetailSuccess } from '../../actions/post'
import api from '@/constants/ApiUrlForBE'
// import { trackPromise } from 'react-promise-tracker';

/**
 * postDetail saga
 */
export function* fetchPostDetail() {
  while (true) {
    const {
      payload: { number = '0' },
    } = yield take(FETCH_POST_DETAIL)
    const searchList = yield select(state => state.search.items)
    const postList = yield select(state => state.post.list)
    const list = [...searchList, ...postList]
    let detail = ``

    try {
      // const res = yield trackPromise(fetch(`${api.getGitHubIssues}/${number}`));
      detail = list.find(item => item.number === number - 0)
      if (!detail) {
        const res = yield fetch(`${api.getGitHubIssue}/${number}`)
        detail = yield res.json()
      }
      yield put(fetchPostDetailSuccess(detail))
    } catch (e) {
      yield put(fetchPostDetailFail())
    }
  }
}

export default [fork(fetchPostDetail)]
