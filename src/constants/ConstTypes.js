import GithubOutlined from '@ant-design/icons/GithubOutlined';
import WeiboOutlined from '@ant-design/icons/WeiboOutlined';
import MailFilled from '@ant-design/icons/MailFilled';

// 博客名称
export const blogName = "hexh's blog";

// 联系方式
export const contactTypes = [
  {
    text: 'GitHub',
    link: 'https://github.com/hexh250786313',
    Icon: GithubOutlined,
  },
  {
    text: 'Weibo',
    link: 'https://weibo.com/HanaSoup',
    Icon: WeiboOutlined,
  },
  {
    text: 'Mail',
    link: 'mailto:250786313@qq.com',
    Icon: MailFilled,
  },
];

// 页面索引
export const pagesIndex = [
  {
    key: '/',
    value: 'Timeline',
  },
  {
    key: '/post/list',
    value: 'Post',
  },
  {
    key: '/about',
    value: 'About',
  },
];
