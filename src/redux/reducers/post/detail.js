import {
  FETCH_POST_DETAIL,
  FETCH_POST_DETAIL_FAIL,
  SAVE_POST_STATE,
} from '@/constants/ActionTypes'

const initialState = {}

const detail = (state = initialState, { type, payload: detail }) => {
  switch (type) {
    case FETCH_POST_DETAIL:
    case FETCH_POST_DETAIL_FAIL:
      return initialState
    case SAVE_POST_STATE:
      return detail
    default:
      return state
  }
}

export default detail
