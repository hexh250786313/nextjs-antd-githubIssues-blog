import { SAVE_TIMELINE } from '../../../constants/ActionTypes'

const initialState = {
  currentList: [],
  currentPage: 1,
}

const timeline = (prevState = initialState, { type, payload: nextState }) => {
  switch (type) {
    case SAVE_TIMELINE:
      return {
        ...prevState,
        ...nextState,
      }
    default:
      return prevState
  }
}

export default timeline
