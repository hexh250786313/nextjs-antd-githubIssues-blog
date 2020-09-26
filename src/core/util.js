import { message } from 'antd'
import { queryLabel } from '@/constants/ConstTypes'

const linkToPending = ['http://', 'https://']
const copyPending = ['mailto:']

const handleHrefStr = (passStartsWithArr, link) => {
  if (Array.isArray(passStartsWithArr) && typeof link === 'string') {
    return passStartsWithArr.find(str => link.startsWith(str))
  }
  return null
}
/** 返回周几
 *
 * @method getDay
 * @param {0 | 1 | 2 | 3 | 4 | 5 | 6} day
 * @returns {"Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"} 返回周几
 *
 */
const getDay = day => {
  if (typeof day !== `number`) {
    throw new Error(`Not a number`)
  }

  switch (day) {
    case 0:
      return `Monday`
    case 1:
      return `Tuesday`
    case 2:
      return `Wednesday`
    case 3:
      return `Thursday`
    case 4:
      return `Friday`
    case 5:
      return `Saturday`
    case 6:
      return `Sunday`
    default:
      return ``
  }
}

// transform the http query & params
export const filterObject = (o, filter) => {
  const r = {}
  Object.keys(o).forEach(k => {
    if (filter(o[k], k)) {
      r[k] = o[k]
    }
  })
  return r
}

/** 处理链接，不同前缀的链接会有不同处理
 *
 * @method handleLink
 * @param {string} link 接收一个字符串
 * @returns {string} 返回源字符串
 *
 */
export const handleLink = link => {
  if (typeof link === 'string') {
    let startsWith
    if ((startsWith = handleHrefStr(linkToPending, link))) {
      const eleLink = document.createElement('a')
      eleLink.style.display = 'none'
      eleLink.href = link
      eleLink.target = '_blank'
      // 受浏览器安全策略的因素，动态创建的元素必须添加到浏览器后才能实施点击
      document.body.appendChild(eleLink)
      // 触发点击
      eleLink.click()
      // 然后移除
      document.body.removeChild(eleLink)
      return link
    } else if ((startsWith = handleHrefStr(copyPending, link))) {
      if (require('copy-to-clipboard')(link.replace(startsWith, ''))) {
        message.success('Copied！')
      } else {
        message.error('Error！')
      }
      return link
    }
  }
  throw new Error(`Not a string`)
}

/** 处理特殊标签标签的内容，提取或者去除
 *
 * @method handleTagContent
 * @param {string} source 要处理的字符串
 * @param {'get' | 'exec'} action 进行的操作，'get': 获取特殊标签中的内容，'exec': 去除特殊标签
 * @param {string} tag 进行的操作，'get': 获取特殊标签中的内容，'exec': 去除特殊标签
 * @returns {string} 返回特殊标签标签中的内容或去除特殊标签后的内容
 *
 */
export const handleTagContent = (source = ``, tag = `desc`, action = `get`) => {
  const actions = ['get', 'exec']
  if (typeof source !== `string` || typeof action !== `string`) {
    throw new Error(`Not a string`)
  }
  if (!actions.includes(action)) {
    throw new Error(`Require 'get' or 'exec'`)
  }
  const reg = new RegExp(`<${tag}>([\\s\\S]+)<\\/${tag}>`, `g`)
  let str = ``
  let strWithTag = ``
  if ((str = reg.exec(source))) {
    strWithTag = str[0]
    str = str[1]
  }

  switch (action) {
    case `get`:
      return str
    case `exec`:
      if (strWithTag) {
        return source.replace(strWithTag, '')
      }
      return source
    default:
      break
  }
}

/** UTC转北京时间
 *
 * @method utc2locale
 * @param {string} utc_datetime
 * @returns {string} 格式化日期
 *
 */
export const utc2locale = utc_datetime => {
  if (typeof utc_datetime !== `string`) {
    throw new Error(`Not a string`)
  }
  if (utc_datetime.indexOf(`T`) === -1 || utc_datetime.indexOf(`Z`) === -1) {
    throw new Error(`Not a UTC`)
  }

  let localeDate = ''
  if (utc_datetime) {
    const date = new Date(utc_datetime)
    // localeDate = new Date(utc_datetime).toLocaleDateString(); // 格式: '2020/7/01' 或者 '7/01/2020'
    localeDate = `${date.getFullYear()}/${date.getMonth() +
      1}/${date.getDate()} ${getDay(date.getDay())}`
    // 这一步是为了保证不同语言环境显示同样的日期格式
    // const dateArr = localeDate.split(`/`);
    // if (dateArr[2].length === 4) {
    //   // Server End
    //   dateArr.splice(0, 0, dateArr.splice(2, 1)[0]);
    // } else if (dateArr[0].length === 4) {
    //   // Client End
    // }
    // localeDate = dateArr.join('/');
  }

  return localeDate
}

/** 处理列表搜索条件
 *
 * @method handleQueryParams
 * @param {string} source 要处理的字符串
 * @returns {string} 返回经过拼接处理的搜索条件
 *
 */
export const handleQueryParams = (keyword = `wsl   配置`) => {
  let query = `state:open+label:${queryLabel}+`
  keyword = keyword.replace(/\s+/g, `+`)
  return query + keyword
}