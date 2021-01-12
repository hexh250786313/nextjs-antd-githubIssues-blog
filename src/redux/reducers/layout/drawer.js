import { OPEN_DRAWER, CLOSE_DRAWER } from '@/constants/ActionTypes'

const initialState = {
  isShowDrawer: false
}

const drawer = (state = initialState, { type }) => {
  switch (type) {
    case OPEN_DRAWER:
      return {
        ...state,
        isShowDrawer: true
      }
    case CLOSE_DRAWER:
      return {
        ...state,
        isShowDrawer: false
      }
    default:
      return state
  }
}

export default drawer
