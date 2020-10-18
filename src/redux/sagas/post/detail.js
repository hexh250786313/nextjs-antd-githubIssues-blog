import { FETCH_POST_DETAIL } from '@/constants/ActionTypes'
import api from '@/constants/ApiUrlForBE'
import { defaultPic } from '@/constants/ConstTypes'
import { handleTagContent } from '@/core/util'
import { requestFail } from '@/redux/actions/global'
import { handleHeaderChange, setTOC } from '@/redux/actions/layout'
import { savePostState } from '@/redux/actions/post'
import fetch from 'isomorphic-unfetch'
import { fork, put, select, take } from 'redux-saga/effects'
import { saveFetchedList } from '@/redux/actions/post.js'
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
      // const res = yield trackPromise(fetch(`${api.githubIssuesApi}/${number}`));
      detail = fetchedList.find(item => item.number === number - 0)
      if (!detail) {
        const res = yield fetch(`${api.githubIssuesApi}/${number}`)
        detail = yield res.json()
      }
      if (!detail.body) {
        throw new Error()
      }

      const body = detail.body
      let pic = handleTagContent(body, `header-img`)

      yield put(savePostState(detail))
      yield put(saveFetchedList([detail]))

      if (pic) {
        pic.replace(/^\r\n+|\r\n+$/g, ``)
        pic = pic.split(`--split--`)[0]
      }
      yield put(
        handleHeaderChange({
          title: detail.title,
          pic: pic || defaultPic,
        }),
      )

      let src = handleTagContent(detail.body, `desc`, `exec`)
      src = handleTagContent(src, `image`, `exec`)
      src = handleTagContent(src, `header-img`, `exec`)
      src = src.replace(/^\s+|\s+$/g, ``)

      yield put(setTOC(src))
    } catch (e) {
      yield put(requestFail(`请求文章详情接口错误，请刷新页面或者联系我`))
    }
  }
}

export default [fork(fetchPostDetail)]
