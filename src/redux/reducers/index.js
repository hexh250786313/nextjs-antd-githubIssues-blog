import { combineReducers } from 'redux'
import home from './home'
import post from './post'
import layout from './layout'
import global from './global'
import search from './search'

export default combineReducers({
  home,
  post,
  layout,
  global,
  search
})
