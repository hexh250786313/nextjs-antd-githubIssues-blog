import {
  FETCH_ABOUT,
  FETCH_ABOUT_SUCCESS,
  FETCH_ABOUT_FAIL,
} from '../../constants/ActionTypes'

export const fetchAbout = payload => ({
  type: FETCH_ABOUT,
  payload,
})

export const fetchAboutSuccess = payload => ({
  type: FETCH_ABOUT_SUCCESS,
  payload,
})

export const fetchAboutFail = payload => ({
  type: FETCH_ABOUT_FAIL,
  payload,
})
