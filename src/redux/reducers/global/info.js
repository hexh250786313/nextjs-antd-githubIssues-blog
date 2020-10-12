import {
  FETCH_BLOG_INFO,
  FETCH_BLOG_INFO_SUCCESS,
} from '@/constants/ActionTypes'

const initialState = {
  open_issues_count: 1,
}

const info = (prevState = initialState, { type, payload: nextState }) => {
  switch (type) {
    case FETCH_BLOG_INFO_SUCCESS:
      return {
        ...prevState,
        ...nextState,
      }
    case FETCH_BLOG_INFO:
    default:
      return prevState
  }
}

export default info
