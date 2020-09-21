import {
  FETCH_ABOUT,
  FETCH_ABOUT_FAIL,
  FETCH_ABOUT_SUCCESS,
} from '@/constants/ActionTypes'

const initialState = {}

const about = (prevState = initialState, { type, payload: nextState }) => {
  switch (type) {
    case FETCH_ABOUT_SUCCESS:
      return nextState
    case FETCH_ABOUT:
    case FETCH_ABOUT_FAIL:
    default:
      return prevState
  }
}

export default about
