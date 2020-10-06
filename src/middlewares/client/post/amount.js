// import { message } from 'antd'
import {
  GET_POSTS_AMOUNT_FAIL
} from '@/constants/ActionTypes'

export default () => next => action => {
  const ret = next(action)
  switch (action.type) {
    case GET_POSTS_AMOUNT_FAIL: {
      // message.error('你能跟上我的思必得吗~')
      break
    }
    default:
  }
  return ret
}
