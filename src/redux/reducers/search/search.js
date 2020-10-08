import {
  SAVE_SEARCH,
  FETCH_SEARCH_FAIL,
  CHANGE_SEARCH_KEYWORD,
} from '@/constants/ActionTypes'
import { searchQuery } from '@/constants/ConstTypes'

const initialState = {
  items: [],
  query: searchQuery,
  total_count: 0,
  loading: false,
  cacheList: [],
}

const search = (prevState = initialState, { type, payload: nextState }) => {
  switch (type) {
    case CHANGE_SEARCH_KEYWORD:
      return {
        ...prevState,
        query: {
          ...prevState.query,
          keyword: nextState,
        },
      }
    case SAVE_SEARCH:
      return {
        ...prevState,
        ...nextState,
      }
    case FETCH_SEARCH_FAIL:
    default:
      return prevState
  }
}

export default search
