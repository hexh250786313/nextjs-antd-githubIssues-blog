import { combineReducers } from 'redux'
import home from './home'
import post from './post'
import layout from './layout'
import blog from './blog'
import search from './search'

export default combineReducers({
  home,
  post,
  layout,
  blog,
  search,
})
