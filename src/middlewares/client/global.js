import { message } from 'antd'
import { REQUEST_FAIL } from '@/constants/ActionTypes'

const ERROR_TEXT = `接口错误，请刷新页面或请联系我`

export default () => next => action => {
  const ret = next(action)
  switch (action.type) {
    case REQUEST_FAIL: {
      if (!!process.browser) {
        message.error(action.payload || ERROR_TEXT)
      } else {
        console.log(action.payload || ERROR_TEXT)
      }
      break
    }
    default:
  }
  return ret
}
