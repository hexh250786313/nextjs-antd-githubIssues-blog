import {
  FETCH_BLOG_INFO,
  FETCH_BLOG_INFO_FAIL,
  FETCH_BLOG_INFO_SUCCESS,
} from '@/constants/ActionTypes'

// 获取博客的信息

export const fetchBlogInfo = payload => ({
  type: FETCH_BLOG_INFO,
  payload,
})

export const fetchBlogInfoFail = payload => ({
  type: FETCH_BLOG_INFO_FAIL,
  payload,
})

export const fetchBlogInfoSuccess = payload => ({
  type: FETCH_BLOG_INFO_SUCCESS,
  payload,
})
