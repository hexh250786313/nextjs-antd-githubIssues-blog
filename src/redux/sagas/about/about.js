import { FETCH_ABOUT } from '@/constants/ActionTypes'
import api from '@/constants/ApiUrlForBE'
import { aboutPic, aboutQuery } from '@/constants/ConstTypes'
import nextFetch from '@/core/nextFetch'
import { handleTagContent } from '@/core/util'
import { requestFail } from '@/redux/actions/global'
import { handleHeaderChange, setTOC } from '@/redux/actions/layout'
import { savePostState } from '@/redux/actions/post'
import { call, fork, put, select, take } from 'redux-saga/effects'
import { saveFetchedList } from '@/redux/actions/post.js'

const fetchList = query => {
  return nextFetch.get(api.githubIssuesApi, { query })
}

/**
 * About saga
 */
function* fetchAbout() {
  while (true) {
    yield take(FETCH_ABOUT)
    const query = aboutQuery
    const fetchedList = yield select(state => state.post.list.fetchedList)

    let detail, res

    try {
      detail = fetchedList.find(item =>
        item.labels.some(label => label.name === `about`),
      )
      if (!detail) {
        res = yield call(fetchList, query)
        if (Array.isArray(res)) {
          detail = res[0]
        } else {
          throw new Error()
        }
      }

      yield put(savePostState(detail))
      yield put(saveFetchedList([detail]))

      yield put(
        handleHeaderChange({
          title: detail.title,
          pic: aboutPic,
        }),
      )
      yield put(setTOC(handleTagContent(detail.body, `desc`, `exec`)))
    } catch (e) {
      yield put(requestFail(`请求关于页面的接口错误，请刷新页面或者联系我`))
    }
  }
}

export default [fork(fetchAbout)]
