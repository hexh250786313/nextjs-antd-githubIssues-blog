import {
  SAVE_LIST_STATE,
  SAVE_FETCHED_LIST
} from '@/constants/ActionTypes'
import { listQuery } from '@/constants/ConstTypes'
import { handleFetchedList } from '@/core/util'

const initialState = {
  items: [],
  total_count: 0,
  query: listQuery,
  loading: false,
  cacheList: {},
  fetchedList: []
}

const list = (prevState = initialState, { type, payload: nextState }) => {
  switch (type) {
    case SAVE_FETCHED_LIST:
      return {
        ...prevState,
        fetchedList: handleFetchedList(prevState.fetchedList, nextState)
      }
    case SAVE_LIST_STATE:
      return {
        ...prevState,
        ...nextState
      }
    default:
      return prevState
  }
}

export default list
