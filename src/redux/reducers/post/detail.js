import {
  FETCH_POST_DETAIL,
  FETCH_POST_DETAIL_FAIL,
  FETCH_POST_DETAIL_SUCCESS,
} from '../../../constants/ActionTypes'

const initialState = {}

const detail = (state = initialState, { type, payload: detail }) => {
  switch (type) {
    case FETCH_POST_DETAIL:
    case FETCH_POST_DETAIL_FAIL:
      return initialState
    case FETCH_POST_DETAIL_SUCCESS:
      return detail
    default:
      return state
  }
}

export default detail
