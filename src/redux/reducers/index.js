import { combineReducers } from 'redux';
import home from './home';
import post from './post';
import layout from './layout';

export default combineReducers({
  home,
  post,
  layout,
});

