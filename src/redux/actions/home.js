import {
  SAVE_TIMELINE,
  FETCH_TIMELINE,
  FETCH_TIMELINE_SUCCESS,
  FETCH_TIMELINE_FAIL,
} from '@/constants/ActionTypes'

export const saveTimeline = payload => ({
  type: SAVE_TIMELINE,
  payload,
})

export const fetchTimeline = (payload, callback) => ({
  type: FETCH_TIMELINE,
  payload,
  callback,
})

export const fetchTimelineSuccess = payload => ({
  type: FETCH_TIMELINE_SUCCESS,
  payload,
})

export const fetchTimelineFail = payload => ({
  type: FETCH_TIMELINE_FAIL,
  payload,
})
