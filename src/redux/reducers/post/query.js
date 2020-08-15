import { SAVE_QUERY_PARAMS } from '../../../constants/ActionTypes'
import { postsListQuery } from '../../../constants/ConstTypes'

const query = (state = postsListQuery, { type, payload: params }) => {
  switch (type) {
    case SAVE_QUERY_PARAMS:
      return {
        ...postsListQuery,
        ...params,
      }
    default:
      return state
  }
}

export default query
