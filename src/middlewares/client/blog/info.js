import { message } from 'antd'
import { FETCH_BLOG_INFO_FAIL } from '../../../constants/ActionTypes'

export default () => next => action => {
  const ret = next(action)
  switch (action.type) {
    case FETCH_BLOG_INFO_FAIL: {
      message.error('你能跟上我的思必得吗~')
      break
    }
    default:
  }
  return ret
}
