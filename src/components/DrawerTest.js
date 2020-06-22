import Link from 'next/link';
import {
  // Drawer as AntDrawer,
  Input,
  Menu,
  Dropdown,
} from 'antd';
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
            key={link}
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
  const [isShowDropDownContact, setShowDropDownContact] = useState(false);
  const [isMobileEnd, setMobileEnd] = useState(false);

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

  const handleDropDownContact = () => {
    isMobileEnd && setShowDropDownContact(!isShowDropDownContact);
  };

  useEffect(() => {
    const deviceWidth = window.screen.width || 0;
    if (deviceWidth && deviceWidth < 768) {
      setSearchWidth(OPENED_SEARCH_BAR_WIDTH);
      setMobileEnd(true);

      document.addEventListener('click', event => {
        const cDom = document.getElementById('popup');
        const tDom = event.target;
        if (
          cDom === tDom ||
          cDom.contains(tDom) ||
          tDom.id === 'popup-handler'
        ) {
          // ...
        } else {
          setShowDropDownContact(false);
        }
      });
    }
  }, []);

  const handleSearchText = ({ currentTarget: { value } }) => {
    setSearchText(value);
  };

  return (
    <div className="wrap">
      <div className="mask" onClick={closeDrawer} />
      <div id="drawer" className="drawer">
        <div id="header" className="header">
          <div className="container">
            <Link href="/">
              <h1 onClick={closeDrawer} className="title">
                {blogName}
              </h1>
            </Link>
            <div className="secondary">
              <ul className="controls">
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
                <Dropdown overlay={_Menu} disabled={isMobileEnd}>
                  <li className="item-contact" onClick={handleDropDownContact}>
                    <div className="contact" id="popup-handler">
                      联系我
                    </div>
                  </li>
                </Dropdown>
              </ul>
            </div>
          </div>
        </div>
        {
          // <AntDrawer
          // visible={isShowDrawer}
          // width={0}
          // onClose={closeDrawer}
          // ></AntDrawer>
        }
        <div className="dropdown-menu" id="popup">
          <p className="menu-item">hei</p>
        </div>
      </div>
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

        .title {
          cursor: pointer;
          color: ${color_primary};
        }

        .controls {
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

        .dropdown-menu {
          display: none;
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
          .wrap {
            height: 100vh;
            width: 100vw;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;
            display: ${isShowDrawer ? 'block' : 'none'};
          }

          .mask {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            display: ${isShowDrawer ? 'block' : 'none'};
          }

          .drawer {
            background: #fff;
            width: 270px;
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
            transform: translate3d(${isShowDrawer ? '0' : '-276px'}, 0, 0);
            transition: transform 0.2s;
            z-index: 1050;
          }

          .title {
            padding: 13px 10px;
            font-size: 16px;
            font-weight: normal;
            margin: 0;
            text-align: center;
          }

          .controls {
            margin-top: 10px;
          }

          .controls > * {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            margin: 0;
          }

          .item-contact {
            margin-top: 10px !important;
          }

          .dropdown-menu {
            background: #fff;
            z-index: 1030;
            transform: translate3d(
              0,
              ${isShowDropDownContact ? '0' : '70vh'},
              0
            );
            visibility: ${isShowDropDownContact ? 'visible' : 'hidden'};
            transition-delay: 0s;
            margin: 0;
            position: fixed;
            left: 0 !important;
            right: 0 !important;
            width: calc(100vw + 276px);
            bottom: 0;
            top: auto;
            padding: 0;
            padding-bottom: 40px !important;
            display: block;
            border-radius: 0;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
            overflow: auto;
            transition: transform 0.3s, visibility 0.3s;
          }
        }

        @media (min-width: 768px) {
          .header {
            position: fixed;
            padding: 8px;
            height: 52px;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
          }

          .title {
            float: left;
            vertical-align: top;
            font-size: 18px;
            font-weight: normal;
            margin: 0 15px 0 0;
            line-height: 34px;
          }

          .secondary {
            margin-top: 3px;
            float: right;
          }

          .controls,
          .controls > li {
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
    </div>
  );
};

Drawer.propTypes = {
  isShowDrawer: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};

export default Drawer;
