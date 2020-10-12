import {
  FETCH_SEARCH,
  SAVE_SEARCH,
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

export const changeSearchKeyword = payload => ({
  type: CHANGE_SEARCH_KEYWORD,
  payload,
})
