import {
  HANDLE_HEADER_CHANGE,
  OPEN_DRAWER,
  CLOSE_DRAWER,
  HANDLE_SEARCH_TEXT_CHANGE,
  SET_TOC,
  FETCH_SEARCH_RESULT,
  FETCH_SEARCH_RESULT_SUCCESS,
  FETCH_SEARCH_RESULT_FAIL,
  SAVE_SEARCH_QUERY_PARAMS
} from '@/constants/ActionTypes'

export function openDrawer() {
  return {
    type: OPEN_DRAWER,
  }
}

export function closeDrawer() {
  return {
    type: CLOSE_DRAWER,
  }
}

export function handleSearchTextChange(payload) {
  return {
    type: HANDLE_SEARCH_TEXT_CHANGE,
    payload,
  }
}

export function handleHeaderChange(payload) {
  return {
    type: HANDLE_HEADER_CHANGE,
    payload,
  }
}

export function setTOC(payload) {
  return {
    type: SET_TOC,
    payload,
  }
}

export const saveQueryParams = payload =>
  !!payload.noCache
    ? {
        type: SAVE_SEARCH_QUERY_PARAMS,
        payload: {},
      }
    : {
        type: SAVE_SEARCH_QUERY_PARAMS,
        payload,
      }

export const fetchSearchResult = (payload, callback) => ({
  type: FETCH_SEARCH_RESULT,
  payload,
  callback,
})

export const fetchSearchResultFail = payload => ({
  type: FETCH_SEARCH_RESULT_FAIL,
  payload,
})

export const fetchSearchResultSuccess = payload => ({
  type: FETCH_SEARCH_RESULT_SUCCESS,
  payload,
})
