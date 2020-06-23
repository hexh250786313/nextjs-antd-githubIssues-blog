import { OPEN_DRAWER, CLOSE_DRAWER, HANDLE_SEARCH_TEXT_CHANGE } from '../../constants/ActionTypes';

export function openDrawer() {
  return {
    type: OPEN_DRAWER,
  };
}

export function closeDrawer() {
  return {
    type: CLOSE_DRAWER,
  };
}

export function handleSearchTextChange(payload) {
  return {
    type: HANDLE_SEARCH_TEXT_CHANGE,
    payload,
  };
}

