import { combineReducers } from 'redux'
import list from './list'
import detail from './detail'
import query from './query'

export default combineReducers({
  list,
  detail,
  query,
})
