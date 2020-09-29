import GithubOutlined from '@ant-design/icons/GithubOutlined'
import WeiboOutlined from '@ant-design/icons/WeiboOutlined'
import MailFilled from '@ant-design/icons/MailFilled'
import CalendarFilled from '@ant-design/icons/CalendarFilled'
import EditFilled from '@ant-design/icons/EditFilled'
import QuestionCircleFilled from '@ant-design/icons/QuestionCircleFilled'

// 博客名称
export const blogName = "hexh's blog"

// 默认图片
export const indexPic =
  'http://pic.yupoo.com/sinaweibo4907754196_v/cc169439/ebae9d38.jpg'

// 关于页面图片
export const aboutPic =
  'http://pic.yupoo.com/sinaweibo4907754196_v/a9592e94/41111f63.png'

// 默认图片
export const defaultPic =
  'http://pic.yupoo.com/sinaweibo4907754196_v/a0fb7a83/621ed2be.jpg'

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
]

// 页面索引
export const pagesIndex = [
  {
    key: '/',
    value: 'Timeline',
    Icon: CalendarFilled,
  },
  {
    key: '/post/list',
    value: 'Post',
    Icon: EditFilled,
  },
  {
    key: '/about',
    value: 'About',
    Icon: QuestionCircleFilled,
  },
]

// 首页时间轴查询条件
export const timelineQuery = {
  labels: undefined,
  page: 1,
  per_page: 10,
  noCache: true, // 这个不是接口的参数，用于 redux 判断是否需要储存查询参数，例如首页的时间轴就不需要储存参数
}

// post 列表查询条件
export const postsListQuery = {
  // labels: `post`,
  // // labels: `bug`,
  page: 1,
  per_page: 1,
  // per_page: 10,
  // creator: `hexh250786313`,
  // sort: `created`,
  // direction: `desc`,
  // state: `open`,
  // noCache: false, // 这个不是接口的参数，用于 redux 判断是否需要储存查询参数，例如首页的时间轴就不需要储存参数
  q: `state:open+label:qZy6GBWGe`,
  sort: `created`,
  order: `desc`,
}

// post 数量查询条件
export const postsAmountQuery = {
  per_page: 10000,
  page: 1,
  noCache: true,
}

// about 列表查询条件
export const aboutQuery = {
  labels: `about`,
  page: 1,
  per_page: 1,
  creator: `hexh250786313`,
  sort: `created`,
  direction: `desc`,
  state: `open`,
  noCache: false, // 这个不是接口的参数，用于 redux 判断是否需要储存查询参数，例如首页的时间轴就不需要储存参数
}

// 查询标识
export const queryLabel = `qZy6GBWGe`
