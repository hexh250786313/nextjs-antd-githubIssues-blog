import { Affix, Menu } from 'antd';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';

const Item = Menu.Item;

const SideNavigation = () => {
  const [pathname, setPathname] = useState('/');

  useEffect(() => {
    setPathname(window.location.pathname);
    Router.events.on('routeChangeComplete', pathname => setPathname(pathname));
  });

  return (
    <>
      <Affix offsetTop={80}>
        <div className="navigation">
          <Menu selectedKeys={[pathname]} mode="vertical">
            <Item key="/">
              <Link href="/">
                <a>Timeline</a>
              </Link>
            </Item>
            <Item key="/post/list">
              <Link href="/post/list">
                <a>Post</a>
              </Link>
            </Item>
          </Menu>

          <style jsx>{`
            .navigation {
              width: 190px;
            }

            :global(.navigation .ant-menu-vertical) {
              border-right: 0;
            }
           `}</style>
        </div>
      </Affix>
    </>
  );
};

export default SideNavigation;
