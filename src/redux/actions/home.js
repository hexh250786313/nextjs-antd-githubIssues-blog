import { SAVE_TIMELINE } from '../../constants/ActionTypes'

export const saveTimeline = payload => ({
  type: SAVE_TIMELINE,
  payload,
})
