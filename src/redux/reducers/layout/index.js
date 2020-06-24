import { combineReducers } from 'redux';
import drawer from './drawer';
import search from './search';
import header from './header';

export default combineReducers({
  drawer,
  search,
  header,
});
