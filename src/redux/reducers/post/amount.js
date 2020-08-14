import { GET_POSTS_AMOUNT } from '../../../constants/ActionTypes'

const initialState = 1

const amount = (prevState = initialState, { type, payload: nextState }) => {
  switch (type) {
    case GET_POSTS_AMOUNT:
      return nextState
    default:
      return prevState
  }
}

export default amount
