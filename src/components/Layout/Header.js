import { color_primary } from '../../constants/CustomTheme';
import { useState, useEffect } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import {blogName} from '../../constants/ConstTypes';
import Link from 'next/link';

const Header = ({ openDrawer }) => {
  const [isShowTopShadow, setTopShadow] = useState(false);

  let scrollTop = 0;

  useEffect(() => {
    window.addEventListener(
      'scroll',
      () => {
        const currtScrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0;
        if (currtScrollTop > 0 && scrollTop === 0) {
          scrollTop = 1;
          setTopShadow(true);
        } else if (currtScrollTop === 0 && scrollTop > 0) {
          scrollTop = 0;
          setTopShadow(false);
        }
      },
      false,
    );
  }, []);

  return (
    <div className="header">
      <div className="button-box">
        <Button
          onClick={openDrawer}
          type="link"
          icon={<MenuOutlined />}
          size="large"
        />
      </div>

      <Link href="/">
        <div className="title">
          {blogName}
        </div>
      </Link>

      <style>{`
        .header {
          height: 46px;
          width: 100%;
          background-color: #fff;
          color: ${color_primary};
          box-shadow: ${isShowTopShadow ? '0 2px 6px rgba(0, 0, 0, 0.35)' : 'null'};
          position: fixed;
          top: 0;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .title {
          cursor: pointer;
          font-size: 16px;
          color: ${color_primary};
        }

        @media (min-width: 768px) {
          .button-box {
            display: none;
          }

          .header {
            padding: 0 12px;
          }
        }

        @media (max-width: 767px) {
          .title {
            display: none;
          }
        }

        :global(.header .ant-btn) {
          height: 46px;
          width: 46px;
        }
      `}</style>
    </div>
  );
};

Header.propTypes = {
  openDrawer: PropTypes.func.isRequired,
};

export default Header;
