import {
  FETCH_POST_LIST,
  FETCH_POST_LIST_FAIL,
  FETCH_POST_LIST_SUCCESS,
  FETCH_POST_DETAIL,
  FETCH_POST_DETAIL_FAIL,
  FETCH_POST_DETAIL_SUCCESS,
  SAVE_QUERY_PARAMS,
} from '../../constants/ActionTypes'

export function saveQueryParams(payload) {
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