import { SAVE_TIME_LINE } from '../../../constants/ActionTypes'

const initialState = {
  list: [],
  page: 1,
}

const timeline = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_TIME_LINE:
      return payload
    default:
      return state
  }
}

export default timeline
