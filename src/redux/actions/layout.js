import {
  HANDLE_HEADER_CHANGE,
  OPEN_DRAWER,
  CLOSE_DRAWER,
  SET_TOC
} from '@/constants/ActionTypes'

export function openDrawer () {
  return {
    type: OPEN_DRAWER
  }
}

export function closeDrawer () {
  return {
    type: CLOSE_DRAWER
  }
}

export function handleHeaderChange (payload) {
  return {
    type: HANDLE_HEADER_CHANGE,
    payload
  }
}

export function setTOC (payload) {
  return {
    type: SET_TOC,
    payload
  }
}
