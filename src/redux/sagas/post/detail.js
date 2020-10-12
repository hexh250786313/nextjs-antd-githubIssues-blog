import fetch from 'isomorphic-unfetch'
import { take, put, fork, select } from 'redux-saga/effects'
import { FETCH_POST_DETAIL } from '@/constants/ActionTypes'
import {
  fetchPostDetailFail,
  savePostState,
} from '@/redux/actions/post'
import { handleHeaderChange, setTOC } from '@/redux/actions/layout'
import api from '@/constants/ApiUrlForBE'
import { handleTagContent } from '@/core/util'
import { defaultPic } from '@/constants/ConstTypes'
// import { trackPromise } from 'react-promise-tracker';

/**
 * postDetail saga
 */
export function* fetchPostDetail() {
  while (true) {
    const {
      payload: { number = '0' },
    } = yield take(FETCH_POST_DETAIL)
    const fetchedList = yield select(state => state.post.list.fetchedList)

    let detail

    try {
      // const res = yield trackPromise(fetch(`${api.getGitHubIssues}/${number}`));
      detail = fetchedList.find(item => item.number === number - 0)
      if (!detail) {
        const res = yield fetch(`${api.getGitHubIssue}/${number}`)
        detail = yield res.json()
      }
      if (!detail.body) {
        throw new Error()
      }
      yield put(savePostState(detail))
      yield put(
        handleHeaderChange({
          title: detail.title,
          pic: defaultPic,
        }),
      )
      yield put(setTOC(handleTagContent(detail.body, `desc`, `exec`)))
    } catch (e) {
      yield put(fetchPostDetailFail())
    }
  }
}

export default [fork(fetchPostDetail)]
