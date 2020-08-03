import { combineReducers } from 'redux'
import counter from './counter'
import timeline from './timeline'

export default combineReducers({
  counter,
  timeline,
})

