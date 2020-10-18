import PropTypes from 'prop-types'
import { Affix, Menu } from 'antd'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { pagesIndex } from '@/constants/ConstTypes'
import TOC from '@/containers/layout/toc'
import OrderedListOutlined from '@ant-design/icons/OrderedListOutlined'

const Item = Menu.Item

const SideNavigation = ({ mdSource, currentPostListPage }) => {
  const [pathname, setPathname] = useState('/')

  const handleLink = key => {
    if (key.indexOf(`list`) !== -1) {
      key = key + `?page=${currentPostListPage}`
    }
    return key
  }

  const pathnameHandler = pathname => {
    pagesIndex.some(({ key }) => {
      if (key !== `/` && pathname.startsWith(key)) {
        pathname = key
        return true
      }
    })
    setPathname(pathname)
  }

  useEffect(() => {
    setPathname(window.location.pathname)
    Router.events.on('routeChangeComplete', pathnameHandler)

    return () => {
      Router.events.off('routeChangeComplete', pathnameHandler)
    }
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
                  <Link href={handleLink(key)}>
                    <a target="_self">{value}</a>
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
  currentPostListPage: PropTypes.number,
}

SideNavigation.defaultProps = {
  mdSource: '',
  currentPostListPage: 1,
}

export default SideNavigation
