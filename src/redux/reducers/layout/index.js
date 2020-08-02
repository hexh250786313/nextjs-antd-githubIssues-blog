import { combineReducers } from 'redux'
import drawer from './drawer'
import search from './search'
import header from './header'
import toc from './toc'

export default combineReducers({
  drawer,
  search,
  header,
  toc,
})
