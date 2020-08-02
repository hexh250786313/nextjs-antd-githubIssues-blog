import {
  FETCH_POST_LIST,
  FETCH_POST_LIST_FAIL,
  FETCH_POST_LIST_SUCCESS,
  FETCH_POST_DETAIL,
  FETCH_POST_DETAIL_FAIL,
  FETCH_POST_DETAIL_SUCCESS,
  SAVE_QUERY_PARAMS,
  GET_POSTS_AMOUNT,
  GET_POSTS_AMOUNT_SUCCESS,
  GET_POSTS_AMOUNT_FAIL,
} from '../../constants/ActionTypes'

export function saveQueryParams(payload) {
  if (payload.noCache) {
    return {
      type: SAVE_QUERY_PARAMS,
      payload: {},
    }
  }
  return {
    type: SAVE_QUERY_PARAMS,
    payload: payload,
  }
}

export function fetchPostList(payload) {
  return {
    type: FETCH_POST_LIST,
    payload: payload,
  }
}

export function fetchPostListFail(payload) {
  return {
    type: FETCH_POST_LIST_FAIL,
    payload,
  }
}

export function fetchPostListSuccess(payload) {
  return {
    type: FETCH_POST_LIST_SUCCESS,
    payload,
  }
}

export function fetchPostDetail(payload) {
  return {
    type: FETCH_POST_DETAIL,
    payload,
  }
}

export function fetchPostDetailFail(payload) {
  return {
    type: FETCH_POST_DETAIL_FAIL,
    payload,
  }
}

export function fetchPostDetailSuccess(payload) {
  return {
    type: FETCH_POST_DETAIL_SUCCESS,
    payload,
  }
}

// 该方法用于获取标签为 post 的 issue 的总数
export function getPostsAmount(payload) {
  return {
    type: GET_POSTS_AMOUNT,
    payload: payload || {
      labels: `post`,
      per_page: 10000,
      page: 1,
      noCache: true,
    },
  }
}

export function getPostsAmountSuccess(payload) {
  return {
    type: GET_POSTS_AMOUNT_SUCCESS,
    payload: payload,
  }
}

export function getPostsAmountFail(payload) {
  return {
    type: GET_POSTS_AMOUNT_FAIL,
    payload: payload,
  }
}
