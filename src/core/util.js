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
        message.success('已经复制到剪贴板');
      } else {
        message.error('哎呀，出错了');
      }
    }
  }
  return null;
};
