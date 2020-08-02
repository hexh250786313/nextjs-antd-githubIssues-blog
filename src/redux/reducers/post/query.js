import { SAVE_QUERY_PARAMS } from '../../../constants/ActionTypes'

const initialState = {
  // labels: `post`,
  page: 1,
  per_page: 3,
  // per_page: 1,
  creator: `hexh250786313`,
  sort: `created`,
  direction: `desc`,
  state: `open`,
}

const query = (state = initialState, { type, payload: params }) => {
  switch (type) {
    case SAVE_QUERY_PARAMS:
      return {
        ...initialState,
        ...params,
      }
    default:
      return state
  }
}

export default query
