import { SAVE_QUERY_PARAMS } from '@/constants/ActionTypes'
import { searchQuery } from '@/constants/ConstTypes'

const query = (state = searchQuery, { type, payload: params }) => {
  switch (type) {
    case SAVE_QUERY_PARAMS:
      return {
        ...searchQuery,
        ...params,
      }
    default:
      return state
  }
}

export default query
