import PropTypes from 'prop-types';
import Link from 'next/link';
import { Drawer as AntDrawer, Menu, Input } from 'antd';
import { MailOutlined, SearchOutlined } from '@ant-design/icons';
import { color_primary } from '../constants/CustomTheme';
import { contactTypes, blogName } from '../constants/ConstTypes';
import SubMenu from 'antd/lib/menu/SubMenu';
import { handleLink } from '../core/util';

const renderContact = () => {
  return (
    <SubMenu
      key="contact"
      title={
        <span>
          <MailOutlined />
          <span>联系我</span>
        </span>
      }
    >
      {contactTypes.map(item => {
        const { text, link, Icon } = item;
        return (
          <Menu.Item
            key={link}
            icon={<Icon />}
          >
            {text}
          </Menu.Item>
        );
      })}
    </SubMenu>
  );
};

const Drawer = ({ isShowDrawer, closeDrawer, searchText, handleSearchTextChange }) => {
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
                // onPressEnter={}
                value={searchText}
                onChange={e => {
                  if (e.currentTarget && typeof e.currentTarget.value === 'string') {
                    handleSearchTextChange(e.currentTarget.value);
                  }
                }}
                allowClear
              />
            </Menu.Item>
            {renderContact()}
          </Menu>
        </div>

        <style>{`
          .drawer-container {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: column;
            min-height: 100vh;
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

          .drawer-search {
            border-radius: 100px;
          }

        `}</style>
      </div>
    </AntDrawer>
  );
};

Drawer.propTypes = {
  isShowDrawer: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  handleSearchTextChange: PropTypes.func.isRequired,
  searchText: PropTypes.string,
};

Drawer.defaultProps = {
  searchText: '',
};

export default Drawer;

const linkTo = ({ key }) => {
  handleLink(key);
};
