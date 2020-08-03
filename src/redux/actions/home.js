import { SAVE_TIME_LINE } from '../../constants/ActionTypes'

export function saveTimeLine(payload) {
  return {
    type: SAVE_TIME_LINE,
    payload: payload,
  }
}

