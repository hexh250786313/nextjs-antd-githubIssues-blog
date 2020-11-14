import { HANDLE_HEADER_CHANGE } from '@/constants/ActionTypes'

const initialState = {
  pic: '',
  title: ''
}

const header = (state = initialState, { type, payload }) => {
  switch (type) {
    case HANDLE_HEADER_CHANGE:
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}

export default header
