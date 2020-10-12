import {
  FETCH_BLOG_INFO,
  FETCH_BLOG_INFO_SUCCESS,
  REQUEST_FAIL,
} from '@/constants/ActionTypes'

// 获取博客的信息

export const fetchBlogInfo = payload => ({
  type: FETCH_BLOG_INFO,
  payload,
})

export const fetchBlogInfoSuccess = payload => ({
  type: FETCH_BLOG_INFO_SUCCESS,
  payload,
})

export const requestFail = payload => ({
  type: REQUEST_FAIL,
  payload,
})
