import PropTypes from 'prop-types'
import { Affix, Menu } from 'antd'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { pagesIndex } from '@/constants/ConstTypes'
import TOC from '@/containers/layout/toc'
import OrderedListOutlined from '@ant-design/icons/OrderedListOutlined'

const Item = Menu.Item

const SideNavigation = ({ mdSource }) => {
  const [pathname, setPathname] = useState('/')

  useEffect(() => {
    setPathname(window.location.pathname)
    Router.events.on('routeChangeComplete', pathname => setPathname(pathname))
  }, [])

  return (
    <>
      <Affix offsetTop={80}>
        <div className="navigation">
          <Menu selectedKeys={[pathname]} mode="vertical">
            {pagesIndex.map(item => {
              const { key, Icon, value } = item
              return (
                <Item icon={<Icon />} key={key}>
                  <Link href={key}>
                    <a>{value}</a>
                  </Link>
                </Item>
              )
            })}
            {mdSource ? (
              <Menu.SubMenu
                key="toc"
                icon={<OrderedListOutlined />}
                title="TOC"
              >
                <TOC />
              </Menu.SubMenu>
            ) : null}
          </Menu>

          <style jsx>{`
            .navigation {
              width: 110px;
            }

            @media (max-width: 767px) {
              display: none;
            }
          `}</style>
        </div>
      </Affix>
    </>
  )
}

SideNavigation.propTypes = {
  /**
   * markdown 文本源
   */
  mdSource: PropTypes.string,
}

SideNavigation.defaultProps = {
  mdSource: '',
}

export default SideNavigation
