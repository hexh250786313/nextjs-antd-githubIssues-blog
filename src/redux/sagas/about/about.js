import { put, fork, call, select, take } from 'redux-saga/effects'
import { fetchAboutFail } from '../../actions/about'
import { fetchPostDetailSuccess } from '../../actions/post'
import api from '@/constants/ApiUrlForBE'
import nextFetch from '@/core/nextFetch'
import { aboutQuery } from '@/constants/ConstTypes'
import { FETCH_ABOUT } from '@/constants/ActionTypes'
import { handleHeaderChange, setTOC } from '@/redux/actions/layout'
import { aboutPic } from '@/constants/ConstTypes'
import { handleTagContent } from '@/core/util'

const fetchList = query => {
  return nextFetch.get(api.getGitHubIssues, { query })
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
        }
      }

      yield put(fetchPostDetailSuccess(detail))
      yield put(
        handleHeaderChange({
          title: detail.title,
          pic: aboutPic,
        }),
      )
      yield put(setTOC(handleTagContent(detail.body, `desc`, `exec`)))
    } catch (e) {
      yield put(fetchAboutFail())
    }
  }
}

export default [fork(fetchAbout)]
