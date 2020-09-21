import { SET_TOC } from '@/constants/ActionTypes'

const initialState = {
  source: '',
}

const toc = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TOC:
      return {
        ...state,
        source: payload,
      }
    default:
      return state
  }
}

export default toc
