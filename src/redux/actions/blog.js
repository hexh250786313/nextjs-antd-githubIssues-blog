import {
  FETCH_BLOG_INFO,
  FETCH_BLOG_INFO_FAIL,
  FETCH_BLOG_INFO_SUCCESS,
} from '../../constants/ActionTypes';

export function fetchBlogInfo(payload) {
  return {
    type: FETCH_BLOG_INFO,
    payload,
  };
}

export function fetchBlogInfoFail(payload) {
  return {
    type: FETCH_BLOG_INFO_FAIL,
    payload,
  };
}

export function fetchBlogInfoSuccess(payload) {
  return {
    type: FETCH_BLOG_INFO_SUCCESS,
    payload,
  };
}

