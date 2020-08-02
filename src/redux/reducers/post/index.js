import { combineReducers } from 'redux'
import list from './list'
import detail from './detail'
import query from './query'
import amount from './amount'

export default combineReducers({
  list,
  detail,
  query,
  amount
})
