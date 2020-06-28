import { Affix, Menu } from 'antd';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { pagesIndex } from '../../constants/ConstTypes';

const Item = Menu.Item;

const SideNavigation = () => {
  const [pathname, setPathname] = useState('/');

  useEffect(() => {
    setPathname(window.location.pathname);
    Router.events.on('routeChangeComplete', pathname => setPathname(pathname));
  }, []);

  return (
    <>
      <Affix offsetTop={80}>
        <div className="navigation">
          <Menu selectedKeys={[pathname]} mode="vertical">
            {pagesIndex.map(item => (
              <Item key={item.key}>
                <Link href={item.key}>
                  <a>{item.value}</a>
                </Link>
              </Item>
            ))}
          </Menu>

          <style jsx>{`
            .navigation {
              width: 190px;
            }

            @media (max-width: 767px) {
              display: none;
            }
          `}</style>
        </div>
      </Affix>
    </>
  );
};

export default SideNavigation;
