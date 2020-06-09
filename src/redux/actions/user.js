import {
  FETCH_USER_LIST,
  FETCH_USER_LIST_FAIL,
  FETCH_USER_LIST_SUCCESS,
  FETCH_ISSUES_LIST_FAIL,
  FETCH_ISSUES_LIST_SUCCESS
} from '../../constants/ActionTypes';

export function fetchUserList () {
  return {
    type: FETCH_USER_LIST
  };
}

export function fetchUserListSuccess (payload) {
  return {
    type: FETCH_USER_LIST_SUCCESS,
    payload
  };
}

export function fetchIssuesListSuccess (payload) {
  return {
    type: FETCH_ISSUES_LIST_SUCCESS,
    payload
  };
}

export function fetchIssuesListFail (payload) {
  return {
    type: FETCH_ISSUES_LIST_FAIL,
    payload
  };
}

export function fetchUserListFail () {
  return {
    type: FETCH_USER_LIST_FAIL,
  };
}
