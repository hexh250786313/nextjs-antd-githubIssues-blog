import { combineReducers } from 'redux'
import home from './home'
import post from './post'
import layout from './layout'
import blog from './blog'

export default combineReducers({
  home,
  post,
  layout,
  blog,
})
