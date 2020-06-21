import Link from 'next/link';
import { Drawer as AntDrawer, Input, Menu, Dropdown } from 'antd';
import { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { color_primary } from '../constants/CustomTheme';
import { contactTypes, blogName } from '../constants/ConstTypes';
import PropTypes from 'prop-types';

// const { Search } = Input;

const [OPENED_SEARCH_BAR_WIDTH, CLOSED_SEARCH_BAR_WIDTH] = [250, 37];

const iconStyle = {
  fontSize: 15,
};

const handleLink = link => {
  // link = 'https://weibo.com/HanaSoup';
  if (link) {
    let eleLink = document.createElement('a');
    eleLink.style.display = 'none';
    eleLink.href = link;
    eleLink.target = '_blank';
    // 受浏览器安全策略的因素，动态创建的元素必须添加到浏览器后才能实施点击
    document.body.appendChild(eleLink);
    // 触发点击
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
  }
};

const _Menu = () => {
  return (
    <Menu>
      {contactTypes.map(item => {
        const { text, link, Icon } = item;
        return (
          <Menu.Item
            onClick={() => handleLink(link)}
            icon={<Icon style={iconStyle} />}
          >
            {text}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

const Drawer = ({ isShowDrawer, closeDrawer }) => {
  const [searchBarWidth, setSearchWidth] = useState(CLOSED_SEARCH_BAR_WIDTH);
  const [searchText, setSearchText] = useState('');

  const setSearchBarOpen = () => {
    if (searchBarWidth === OPENED_SEARCH_BAR_WIDTH) {
      return null;
    }
    setSearchWidth(OPENED_SEARCH_BAR_WIDTH);
  };

  // const setSearchBarClose = () => {
  // if (searchBarWidth === CLOSED_SEARCH_BAR_WIDTH || searchText) {
  // return null;
  // }
  // setSearchWidth(CLOSED_SEARCH_BAR_WIDTH);
  // };

  useEffect(() => {
    const deviceWidth = window.screen.width || 0;
    if (deviceWidth && deviceWidth < 768) {
      setSearchWidth(OPENED_SEARCH_BAR_WIDTH);
    }
  }, []);

  const handleSearchText = ({ currentTarget: { value } }) => {
    setSearchText(value);
  };

  return (
    <div id="drawer" className="App-drawer">
      <style jsx>{`
        h1 {
          line-height: 1.3;
        }

        .container {
          margin-right: auto;
          margin-left: auto;
          padding-left: 15px;
          padding-right: 15px;
        }

        .container:before,
        .container:after {
          content: ' ';
          display: table;
        }

        .container:after {
          clear: both;
        }

        .Header-title {
          cursor: pointer;
          color: ${color_primary};
        }

        .Header-controls {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .item-search {
          cursor: pointer;
          color: ${color_primary};
        }

        .item-contact {
          cursor: pointer;
          color: ${color_primary};
          line-height: 32px;
        }

        @media (max-width: 1099px) and (min-width: 992px) {
          .container {
            width: 992px;
            transition: width 0.2s;
          }
        }

        @media (min-width: 1100px) {
          .container {
            width: 1100px;
            transition: width 0.2s;
          }
        }

        @media (max-width: 991px) and (min-width: 768px) {
          .container {
            width: 768px;
            transition: width 0.2s;
          }
        }

        @media (max-width: 767px) {
          .App-drawer {
            background: #fff;
            width: 270px;
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            -webkit-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
            -webkit-transform: translate3d(
              ${isShowDrawer ? '0' : '-276px'},
              0,
              0
            );
            transform: translate3d(${isShowDrawer ? '0' : '-276px'}, 0, 0);
            -webkit-transition: -webkit-transform 0.2s;
            -moz-transition: -moz-transform 0.2s;
            -o-transition: -o-transform 0.2s;
            transition: transform 0.2s;
            z-index: 1050;
          }

          .Header-title {
            padding: 13px 10px;
            font-size: 16px;
            font-weight: normal;
            margin: 0;
            text-align: center;
          }

          .Header-controls {
            margin-top: 10px;
          }

          .Header-controls > * {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            margin: 0;
          }

          .item-contact {
            margin-top: 10px !important;
          }

        }

        @media (min-width: 768px) {
          .App-header {
            position: fixed;
            padding: 8px;
            height: 52px;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
          }

          .Header-title {
            float: left;
            vertical-align: top;
            font-size: 18px;
            font-weight: normal;
            margin: 0 15px 0 0;
            line-height: 34px;
          }

          .Header-secondary {
            margin-top: 3px;
            float: right;
          }

          .Header-controls,
          .Header-controls > li {
            display: inline-block;
            vertical-align: middle;
          }

          .item-contact {
            margin-left: 20px;
          }
        }

        :global(.item-search .ant-input-affix-wrapper) {
          border: ${searchBarWidth === OPENED_SEARCH_BAR_WIDTH ? null : 0};
          border-radius: 100px;
        }

        :global(.item-search .ant-input-affix-wrapper-focused) {
          border: 1px solid ${color_primary};
          box-shadow: 0 0 0 0 #fff;
        }

        :global(.item-search .ant-input) {
          margin-left: 5px;
        }
      `}</style>
      <div id="header" className="App-header">
        <div className="container">
          <Link href="/">
            <h1 onClick={closeDrawer} className="Header-title">{blogName}</h1>
          </Link>
          <div className="Header-secondary">
            <ul className="Header-controls">
              <li onClick={setSearchBarOpen} className="item-search">
                <Input
                  prefix={<SearchOutlined style={{ color: color_primary }} />}
                  // onBlur={setSearchBarClose}
                  // placeholder="Search for something interesting?"
                  placeholder="Make your life easier..."
                  // onPressEnter={}
                  style={{ width: searchBarWidth }}
                  value={searchText}
                  onChange={handleSearchText}
                  allowClear
                />
              </li>
              <Dropdown overlay={_Menu}>
                <li className="item-contact">
                  <div className="contact">联系我</div>
                </li>
              </Dropdown>
            </ul>
          </div>
        </div>
      </div>
      <AntDrawer visible={isShowDrawer} width={0} onClose={closeDrawer} />
    </div>
  );
};

Drawer.propTypes = {
  isShowDrawer: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};

export default Drawer;
