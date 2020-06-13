import {
  FETCH_USER_LIST,
  FETCH_USER_LIST_FAIL,
  FETCH_USER_LIST_SUCCESS,
  FETCH_ISSUES_LIST_FAIL,
  FETCH_ISSUES_LIST_SUCCESS,
  FETCH_ISSUE,
  FETCH_ISSUE_SUCCESS,

  FETCH_POST_LIST,
  FETCH_POST_LIST_FAIL,
  FETCH_POST_LIST_SUCCESS,
  FETCH_POST_DETAIL,
  FETCH_POST_DETAIL_FAIL,
  FETCH_POST_DETAIL_SUCCESS,
} from '../../constants/ActionTypes';

export function fetchUserList() {
  return {
    type: FETCH_USER_LIST,
  };
}

export function fetchUserListSuccess(payload) {
  return {
    type: FETCH_USER_LIST_SUCCESS,
    payload,
  };
}

export function fetchIssuesListSuccess(payload) {
  return {
    type: FETCH_ISSUES_LIST_SUCCESS,
    payload,
  };
}

export function fetchIssue() {
  return {
    type: FETCH_ISSUE,
  };
}

export function fetchIssueSuccess(payload) {
  return {
    type: FETCH_ISSUE_SUCCESS,
    payload,
  };
}

export function fetchIssuesListFail(payload) {
  return {
    type: FETCH_ISSUES_LIST_FAIL,
    payload,
  };
}

export function fetchUserListFail() {
  return {
    type: FETCH_USER_LIST_FAIL,
  };
}

// Post Part

export function fetchPostList() {
  return {
    type: FETCH_POST_LIST,
  };
}

export function fetchPostListFail(payload) {
  return {
    type: FETCH_POST_LIST_FAIL,
    payload,
  };
}

export function fetchPostListSuccess(payload) {
  return {
    type: FETCH_POST_LIST_SUCCESS,
    payload,
  };
}

export function fetchPostDetail() {
  return {
    type: FETCH_POST_DETAIL,
  };
}

export function fetchPostDetailFail(payload) {
  return {
    type: FETCH_POST_DETAIL_FAIL,
    payload,
  };
}

export function fetchPostDetailSuccess(payload) {
  return {
    type: FETCH_POST_DETAIL_SUCCESS,
    payload,
  };
}
