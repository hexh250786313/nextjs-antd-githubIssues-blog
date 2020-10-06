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
import Router from 'next/router'

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
  mdSource,
  setLoading,
  changeSearchKeyword,
  searchKeyword,
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
                  setLoading(searchKeyword)
                  Router.push(`/search#q=${searchKeyword}&page=1`)
                  closeDrawer()
                }}
                value={searchKeyword}
                onChange={e => {
                  if (
                    e.currentTarget &&
                    typeof e.currentTarget.value === 'string'
                  ) {
                    changeSearchKeyword(e.currentTarget.value)
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
  isShowDrawer: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  mdSource: PropTypes.string,
  setLoading: PropTypes.func.isRequired,
  changeSearchKeyword: PropTypes.func.isRequired,
  searchKeyword: PropTypes.string.isRequired,
}

Drawer.defaultProps = {
  mdSource: '',
}

export default Drawer

const linkTo = ({ key }) => {
  if (key === `search`) {
    return
  }
  handleLink(key)
}
