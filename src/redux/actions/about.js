import { FETCH_ABOUT, FETCH_ABOUT_SUCCESS } from '@/constants/ActionTypes'

export const fetchAbout = (payload, callback) => ({
  type: FETCH_ABOUT,
  payload,
  callback,
})

export const fetchAboutSuccess = payload => ({
  type: FETCH_ABOUT_SUCCESS,
  payload,
})
