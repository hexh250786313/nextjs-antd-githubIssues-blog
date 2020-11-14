import {
  FETCH_POST_LIST,
  FETCH_POST_DETAIL,
  SAVE_POST_STATE,
  SAVE_LIST_STATE,
  SAVE_FETCHED_LIST
} from '@/constants/ActionTypes'

export const fetchPostList = (payload, callback) => ({
  type: FETCH_POST_LIST,
  payload,
  callback
})

export const fetchPostDetail = payload => ({
  type: FETCH_POST_DETAIL,
  payload
})

export const savePostState = payload => ({
  type: SAVE_POST_STATE,
  payload
})

export const saveListState = payload => ({
  type: SAVE_LIST_STATE,
  payload
})

export const saveFetchedList = payload => ({
  type: SAVE_FETCHED_LIST,
  payload
})
