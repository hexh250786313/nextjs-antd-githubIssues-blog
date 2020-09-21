import { message } from 'antd'
import {
  FETCH_POST_DETAIL_FAIL
} from '@/constants/ActionTypes'

export default () => next => action => {
  const ret = next(action)
  switch (action.type) {
    case FETCH_POST_DETAIL_FAIL: {
      message.error('你能跟上我的思必得吗~')
      break
    }
    default:
  }
  return ret
}
