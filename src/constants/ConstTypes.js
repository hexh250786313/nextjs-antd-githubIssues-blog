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
  'https://pic.yupoo.com/sinaweibo4907754196_v/cc169439/ebae9d38.jpg'

// 关于页面图片
export const aboutPic =
  'https://pic.yupoo.com/sinaweibo4907754196_v/a9592e94/41111f63.png'

// 默认图片
export const defaultPic =
  'https://pic.yupoo.com/sinaweibo4907754196_v/a0fb7a83/621ed2be.jpg'

// 默认主页 title
export const indexTitle =
  "I'm looking for something fun. Are you going with me?"

// 联系方式
export const contactTypes = [
  {
    text: 'GitHub',
    link: 'https://github.com/hexh250786313',
    Icon: GithubOutlined
  },
  {
    text: 'Weibo',
    link: 'https://weibo.com/HanaSoup',
    Icon: WeiboOutlined
  },
  {
    text: 'Mail',
    link: 'mailto:250786313@qq.com',
    Icon: MailFilled
  }
]

// 页面索引
export const pagesIndex = [
  {
    key: '/',
    value: 'Timeline',
    Icon: CalendarFilled
  },
  {
    key: '/post/list',
    value: 'Post',
    Icon: EditFilled
  },
  {
    key: '/about',
    value: 'About',
    Icon: QuestionCircleFilled
  }
]

// 首页时间轴查询条件
export const timelineQuery = {
  labels: undefined,
  page: 1,
  per_page: 10,
  noCache: true // 这个不是接口的参数，用于 redux 判断是否需要储存查询参数，例如首页的时间轴就不需要储存参数
}

// 列表查询条件
export const listQuery = {
  labels: 'post',
  page: 1,
  per_page: 10,
  creator: 'hexh250786313',
  sort: 'created',
  direction: 'desc',
  state: 'open'
}

// 搜索请求的参数
export const searchQuery = (mode = '') => {
  const queryParams = {
    page: 1,
    per_page: 10,
    q: 'state:open+repo:hexh250786313/Blog+author:hexh250786313',
    sort: 'created',
    order: 'desc',
    keyword: ''
  }

  switch (mode) {
    case 'allPost':
      ;(queryParams.per_page = 1),
      (queryParams.page = 100),
      (queryParams.q = 'label:post+state:open+repo:hexh250786313/Blog+author:hexh250786313')
      break
    default:
      break
  }

  return queryParams
}

// about 查询条件
export const aboutQuery = {
  labels: 'about',
  page: 1,
  per_page: 10,
  creator: 'hexh250786313',
  sort: 'created',
  direction: 'desc',
  state: 'open',
  noCache: false // 这个不是接口的参数，用于 redux 判断是否需要储存查询参数，例如首页的时间轴就不需要储存参数
}

// 查询标识
export const queryLabel = 'qZy6GBWGe'

// token
export const githubToken = 'b6a5f3e82ee5c26470864a98f9159ab96bd0b056'

export const queryParams = '+state:open+repo:hexh250786313/Blog+author:hexh250786313'

// 不需要默认图的页面
export const pageWihtoutDefaultHeader = ['search', 'post', 'about']

// 博文仓库地址
export const archieveUrl = 'https://github.com/hexh250786313/Blog/issues'
