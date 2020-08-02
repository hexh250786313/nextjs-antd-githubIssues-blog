import {
  FETCH_BLOG_INFO,
  FETCH_BLOG_INFO_FAIL,
  FETCH_BLOG_INFO_SUCCESS,
} from '../../../constants/ActionTypes'

const initialState = {
  openIssuesCount: 1,
}

const info = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_BLOG_INFO:
    case FETCH_BLOG_INFO_FAIL:
      return initialState
    case FETCH_BLOG_INFO_SUCCESS:
      return {
        ...state,
        ...payload,
      }
    default:
      return state
  }
}

export default info
