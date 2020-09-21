import { HANDLE_SEARCH_TEXT_CHANGE } from '@/constants/ActionTypes'

const initialState = {
  searchText: '',
}

const search = (state = initialState, { type, payload }) => {
  switch (type) {
    case HANDLE_SEARCH_TEXT_CHANGE:
      return {
        ...state,
        searchText: payload,
      }
    default:
      return state
  }
}

export default search
