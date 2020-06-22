import { combineReducers } from 'redux';
import drawer from './drawer';
import search from './search';

export default combineReducers({
  drawer,
  search,
});
