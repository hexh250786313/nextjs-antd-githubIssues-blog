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
  if (
    typeof link === 'string' &&
    ['http://', 'https://'].some(str => link.startsWith(str))
  ) {
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
  }
  return null;
};

