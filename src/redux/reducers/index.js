import { combineReducers } from 'redux';
import home from './home';
import user from './user';
import post from './post';

export default combineReducers({
  home,
  user,
  post,
});

