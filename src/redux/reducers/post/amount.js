import {
  GET_POSTS_AMOUNT,
  GET_POSTS_AMOUNT_FAIL,
  GET_POSTS_AMOUNT_SUCCESS,
} from '../../../constants/ActionTypes'

const initialState = 1

const amount = (prevState = initialState, { type, payload: nextState }) => {
  switch (type) {
    case GET_POSTS_AMOUNT_SUCCESS:
      return nextState
    case GET_POSTS_AMOUNT:
    case GET_POSTS_AMOUNT_FAIL:
    default:
      return prevState
  }
}

export default amount
