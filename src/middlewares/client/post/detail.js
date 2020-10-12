import { message } from 'antd'
import { FETCH_POST_DETAIL_FAIL } from '@/constants/ActionTypes'

const ERROR_TEXT = `请求文章接口错误，请重试或请联系我`

export default () => next => action => {
  const ret = next(action)
  switch (action.type) {
    case FETCH_POST_DETAIL_FAIL: {
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
