import { SAVE_QUERY_PARAMS } from '../../../constants/ActionTypes'

const initialState = {
  labels: `post`,
  // labels: `bug`,
  page: 1,
  // per_page: 1,
  per_page: 10,
  creator: `hexh250786313`,
  sort: `created`,
  direction: `desc`,
  state: `open`,
  noCache: false, // 这个不是接口的参数，用于 redux 判断是否需要储存查询参数，例如首页的时间轴就不需要储存参数
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
