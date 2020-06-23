import { color_primary } from '../../constants/CustomTheme';
import { useState, useEffect } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Input, Dropdown, Menu } from 'antd';
import PropTypes from 'prop-types';
import { blogName, contactTypes } from '../../constants/ConstTypes';
import Link from 'next/link';
import { SearchOutlined } from '@ant-design/icons';
import { handleLink } from '../../core/util';

const [OPENED_SEARCH_BAR_WIDTH, CLOSED_SEARCH_BAR_WIDTH] = [250, 37];

const _Menu = () => {
  return (
    <Menu onClick={linkTo}>
      {contactTypes.map(item => {
        const { text, link, Icon } = item;
        return (
          <Menu.Item key={link} icon={<Icon />}>
            {text}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

const Header = ({ openDrawer, handleSearchTextChange, searchText }) => {
  const [isShowTopShadow, setTopShadow] = useState(false);
  const [searchBarWidth, setSearchWidth] = useState(CLOSED_SEARCH_BAR_WIDTH);
  let scrollTop = 0;

  const setSearchBarOpen = () => {
    if (searchBarWidth === OPENED_SEARCH_BAR_WIDTH) {
      return null;
    }
    setSearchWidth(OPENED_SEARCH_BAR_WIDTH);
  };

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
        <div className="title">{blogName}</div>
      </Link>

      <ul className="menu">
        <li onClick={setSearchBarOpen} className="search">
          <Input
            prefix={<SearchOutlined style={{ color: color_primary }} />}
            // onBlur={setSearchBarClose}
            // placeholder="Search for something interesting?"
            placeholder="Make your life easier..."
            // onPressEnter={}
            style={{ width: searchBarWidth }}
            value={searchText}
            onChange={e => {
              if (e.currentTarget && typeof e.currentTarget.value === 'string') {
                handleSearchTextChange(e.currentTarget.value);
              }
            }}
          />
        </li>
        <Dropdown overlay={_Menu}>
          <li className="contact">联系我</li>
        </Dropdown>
      </ul>

      <style jsx>{`
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

        .menu {
          list-style: none;
          margin: 0;
        }

        .menu > li {
          display: inline-block;
          height: 100%;
          cursor: pointer;
        }

        .menu > li + li {
          margin-left: 20px;
        }

        .contact {
          line-height: 46px;
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
            padding: 0 42px;
          }
        }

        @media (max-width: 767px) {
          .title {
            display: none;
          }

          .menu {
            display: none;
          }
        }

        :global(.header .ant-btn) {
          height: 46px;
          width: 46px;
        }

        :global(.header .ant-input-affix-wrapper) {
          border: ${searchBarWidth === OPENED_SEARCH_BAR_WIDTH ? 'null' : '0'};
          border-radius: 100px;
        }

        :global(.header .ant-input) {
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};

Header.propTypes = {
  openDrawer: PropTypes.func.isRequired,
  handleSearchTextChange: PropTypes.func.isRequired,
  searchText: PropTypes.string,
};

Header.defaultProps = {
  searchText: '',
};

export default Header;

const linkTo = ({ key }) => {
  handleLink(key);
};
