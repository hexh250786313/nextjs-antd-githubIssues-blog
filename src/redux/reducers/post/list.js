import { FETCH_POST_LIST_FAIL, SAVE_LIST_STATE } from '@/constants/ActionTypes'
import { listQuery } from '@/constants/ConstTypes'

const initialState = {
  items: [],
  total_count: 0,
  query: listQuery,
  loading: false,
  cacheList: {},
}

const list = (prevState = initialState, { type, payload: nextState }) => {
  switch (type) {
    case SAVE_LIST_STATE:
      return {
        ...prevState,
        ...nextState,
      }
    default:
    case FETCH_POST_LIST_FAIL:
      return prevState
  }
}

export default list
