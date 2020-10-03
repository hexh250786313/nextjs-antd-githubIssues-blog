import {
  FETCH_SEARCH,
  SAVE_SEARCH,
  FETCH_SEARCH_FAIL,
  CHANGE_SEARCH_KEYWORD,
} from '@/constants/ActionTypes'

export const fetchSearch = (payload, callback) => ({
  type: FETCH_SEARCH,
  payload,
  callback,
})

export const saveSearch = payload => ({
  type: SAVE_SEARCH,
  payload,
})

export const fetchSearchFail = payload => ({
  type: FETCH_SEARCH_FAIL,
  payload,
})

export const changeSearchKeyword = payload => ({
  type: CHANGE_SEARCH_KEYWORD,
  payload,
})
