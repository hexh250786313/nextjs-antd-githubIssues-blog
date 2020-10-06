import fetch from 'isomorphic-unfetch'
import qs from 'query-string'
import { filterObject } from './util'
import { githubToken } from '@/constants/ConstTypes'

// initial fetch
const nextFetch = Object.create(null)
// browser support methods
// ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PATCH', 'PUT']
const HTTP_METHOD = ['get', 'post', 'put', 'patch', 'delete']
// can send data method
const CAN_SEND_METHOD = ['post', 'put', 'delete', 'patch']

HTTP_METHOD.forEach(method => {
  // is can send data in opt.body
  const canSend = CAN_SEND_METHOD.includes(method)
  nextFetch[method] = (path, { data, query, timeout = 10000 } = {}) => {
    let url = path
    const opts = {
      method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: `token ${githubToken}`
      },
      // credentials: 'include',
      timeout,
      mode: 'cors',
      cache: 'no-cache',
    }

    if (query) {
      url += `${url.includes('?') ? '&' : '?'}${qs.stringify(
        filterObject(query, Boolean),
      )}`
    }

    if (canSend && data) {
      opts.body = qs.stringify(filterObject(data, Boolean))
      // opts.body = JSON.stringify(data);
    }

    // console.info('Request Url:', url);

    // github 不会解析编码 + 号后的字符，所以不编码
    if (url.indexOf(`github`) !== -1) {
      url = url.replace(/%2B/g, `+`)
    }

    return fetch(url, opts).then(res => {
      return res.json()
    })
    // .then(({ errcode = 0, errmsg, data }) => {
    //   if (errcode !== 0) {
    //     const err = new Error(errmsg);
    //     err.message = errmsg;
    //     err.code = errcode;
    //     err.data = data;
    //     throw err;
    //   }
    //   return data;
    // });
  }
})

export default nextFetch
