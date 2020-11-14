import { combineReducers } from 'redux'
import drawer from './drawer'
import header from './header'
import toc from './toc'

export default combineReducers({
  drawer,
  header,
  toc
})
