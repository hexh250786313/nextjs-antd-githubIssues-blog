import PropTypes from 'prop-types'
import Link from 'next/link'
import { Drawer as AntDrawer, Menu, Input } from 'antd'
import {
  OrderedListOutlined,
  MailOutlined,
  SearchOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import { color_primary } from '@/constants/CustomTheme'
import { contactTypes, blogName } from '@/constants/ConstTypes'
import { handleLink } from '@/core/util'
import TOC from '@/containers/layout/toc'

const SubMenu = Menu.SubMenu

const renderContact = () => {
  return (
    <SubMenu
      key="contact"
      title={
        <span>
          <MailOutlined />
          <span>CONTACT</span>
        </span>
      }
    >
      {contactTypes.map(item => {
        const { text, link, Icon } = item
        return (
          <Menu.Item key={link} icon={<Icon />}>
            {text}
          </Menu.Item>
        )
      })}
    </SubMenu>
  )
}

const renderTOC = () => {
  return (
    <SubMenu
      key="toc"
      title={
        <span>
          <OrderedListOutlined />
          <span>TOC</span>
        </span>
      }
    >
      <TOC />
    </SubMenu>
  )
}

const Drawer = ({
  isShowDrawer,
  closeDrawer,
  searchText,
  handleSearchTextChange,
  mdSource,
  fetchSearchResult,
}) => {
  return (
    <AntDrawer
      visible={isShowDrawer}
      onClose={closeDrawer}
      placement="left"
      closable={false}
      bodyStyle={{ padding: 0 }}
    >
      <div className="drawer-container">
        <Link href="/">
          <div onClick={closeDrawer} className="drawer-header">
            {blogName}
          </div>
        </Link>
        <div className="drawer-menu">
          <Menu
            defaultOpenKeys={['toc']}
            mode="inline"
            selectable={false}
            onClick={linkTo}
          >
            <Menu.Item key="search">
              <Input
                className="drawer-search"
                prefix={<SearchOutlined style={{ color: color_primary }} />}
                placeholder="Make your life easier..."
                onPressEnter={() => {
                  closeDrawer()
                  fetchSearchResult(searchText)
                }}
                value={searchText}
                onChange={e => {
                  if (
                    e.currentTarget &&
                    typeof e.currentTarget.value === 'string'
                  ) {
                    handleSearchTextChange(e.currentTarget.value)
                  }
                }}
              />
            </Menu.Item>
            {renderContact()}
            <Menu.Item
              key={`https://github.com/hexh250786313/Blog/issues`}
              icon={<FileTextOutlined />}
            >
              ARCHIEVE
            </Menu.Item>
            {mdSource ? renderTOC() : null}
          </Menu>
        </div>
        <style jsx>{`
          .drawer-container {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: column;
          }

          .drawer-container > * {
            width: 100%;
          }

          .drawer-header {
            cursor: pointer;
            padding: 13px 10px;
            text-align: center;
            font-size: 16px;
            color: ${color_primary};
          }

          :global(.drawer-container .ant-input-affix-wrapper) {
            border-radius: 100px;
          }
        `}</style>
      </div>
    </AntDrawer>
  )
}

Drawer.propTypes = {
  /**
   * 控制是否展示抽屉
   */
  isShowDrawer: PropTypes.bool.isRequired,
  /**
   * 关闭抽屉回调
   */
  closeDrawer: PropTypes.func.isRequired,
  /**
   * 搜索内容的 onChange
   */
  handleSearchTextChange: PropTypes.func.isRequired,
  /**
   * 搜索文本
   */
  searchText: PropTypes.string,
  /**
   * markdown 文本源
   */
  mdSource: PropTypes.string,
  fetchSearchResult: PropTypes.func.isRequired,
}

Drawer.defaultProps = {
  searchText: '',
  mdSource: '',
}

export default Drawer

const linkTo = ({ key }) => {
  if (key === `search`) {
    return
  }
  handleLink(key)
}
