import {
  FETCH_POST_LIST,
  FETCH_POST_LIST_FAIL,
  FETCH_POST_LIST_SUCCESS,
} from '@/constants/ActionTypes'

const initialState = []

const list = (prevState = initialState, { type, payload: nextState }) => {
  switch (type) {
    case FETCH_POST_LIST_SUCCESS:
      return nextState
    case FETCH_POST_LIST:
      return prevState
    case FETCH_POST_LIST_FAIL:
    default:
      return prevState
  }
}

export default list
