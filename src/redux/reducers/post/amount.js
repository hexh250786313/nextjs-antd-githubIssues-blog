import {
  GET_POSTS_AMOUNT,
  GET_POSTS_AMOUNT_SUCCESS,
  GET_POSTS_AMOUNT_FAIL,
} from '../../../constants/ActionTypes'

const initialState = 1

const amount = (state = initialState, { type, payload: amount }) => {
  switch (type) {
    case GET_POSTS_AMOUNT:
    case GET_POSTS_AMOUNT_FAIL:
      return initialState
    case GET_POSTS_AMOUNT_SUCCESS:
      return amount
    default:
      return state
  }
}

export default amount
