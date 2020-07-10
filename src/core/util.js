import { message } from 'antd';

const linkToPending = ['http://', 'https://'];
const copyPending = ['mailto:'];

const handleHrefStr = (passStartsWithArr, link) => {
  if (Array.isArray(passStartsWithArr) && typeof link === 'string') {
    return passStartsWithArr.find(str => link.startsWith(str));
  }
  return null;
};

// transform the http query & params
export const filterObject = (o, filter) => {
  const r = {};
  Object.keys(o).forEach(k => {
    if (filter(o[k], k)) {
      r[k] = o[k];
    }
  });
  return r;
};

/** 处理链接，不同前缀的链接会有不同处理
 *
 * @method handleLink
 * @param {string} link 接收一个字符串
 * @returns {string} 返回源字符串
 *
 */
export const handleLink = link => {
  if (typeof link === 'string') {
    let startsWith;
    if ((startsWith = handleHrefStr(linkToPending, link))) {
      const eleLink = document.createElement('a');
      eleLink.style.display = 'none';
      eleLink.href = link;
      eleLink.target = '_blank';
      // 受浏览器安全策略的因素，动态创建的元素必须添加到浏览器后才能实施点击
      document.body.appendChild(eleLink);
      // 触发点击
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
      return link;
    } else if ((startsWith = handleHrefStr(copyPending, link))) {
      if (require('copy-to-clipboard')(link.replace(startsWith, ''))) {
        message.success('Copied！');
      } else {
        message.error('Error！');
      }
    }
  }
  throw new Error(`Not a string`);
};

/** 处理 <desc> 标签的内容，提取或者去除
 *
 * @method handleDescContent
 * @param {string} source 要处理的字符串
 * @param {'get' | 'exec'} action 进行的操作，'get': 获取 desc 中的内容，'exec': 去除 desc
 * @returns {string} 返回 <desc> 标签中的内容或去除 <desc> 后的内容
 *
 */
export const handleDescContent = (source = ``, action = `get`) => {
  const actions = ['get', 'exec'];
  if (typeof source !== `string` || typeof action !== `string`) {
    throw new Error(`Not a string`);
  }
  if (!actions.includes(action)) {
    throw new Error(`Require 'get' or 'exec'`);
  }
  const reg = /<desc>([\s\S]+)<\/desc>/g;
  let desc = ``;
  let descWithTag = ``;
  if ((desc = reg.exec(source))) {
    descWithTag = desc[0];
    desc = desc[1];
  }

  switch (action) {
    case `get`:
      return desc;
    case `exec`:
      if (descWithTag) {
        return source.replace(descWithTag, '');
      }
      return source;
    default:
      break;
  }
};

/** UTC转北京时间
 *
 * @method utc2beijing
 * @param {string} utc_datetime
 * @returns {string} 北京时间
 *
 */
export const utc2beijing = utc_datetime => {
  if (typeof utc_datetime !== `string`) {
    throw new Error(`Not a string`);
  }
  if (utc_datetime.indexOf(`T`) === -1 || utc_datetime.indexOf(`Z`) === -1) {
    throw new Error(`Not a UTC`);
  }
  // 转为正常的时间格式 年-月-日 时:分:秒
  const T_pos = utc_datetime.indexOf('T');
  const Z_pos = utc_datetime.indexOf('Z');
  const year_month_day = utc_datetime.substr(0, T_pos);
  const hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
  const new_datetime = year_month_day + ' ' + hour_minute_second; // 2017-03-31 08:02:06

  // 处理成为时间戳
  let timestamp = new Date(Date.parse(new_datetime));
  timestamp = timestamp.getTime();
  timestamp = timestamp / 1000;

  // 增加8个小时，北京时间比utc时间多八个时区
  timestamp = timestamp + 8 * 60 * 60;

  // 时间戳转为时间
  const beijing_datetime = new Date(
    parseInt(timestamp) * 1000,
  ).toLocaleString();
  // .replace(/年|月/g, '-')
  // .replace(/日/g, ' ');
  return beijing_datetime;
};
