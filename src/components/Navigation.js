import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const Navigation = ({ openDrawer }) => {
  return (
    <div className="App-navigation">
      <style jsx>{`
        @media (max-width: 767px) {
          .App-backControl {
            position: fixed !important;
            z-index: 1001;
            top: 0 !important;
            margin: 0;
          }
        }

        @media (min-width: 768px) {
          .App-navigation {
            display: none;
          }
        }

        :global(.Navigation .ant-btn) {
          height: 46px;
          width: 46px;
        }
      `}</style>

      <div className="Navigation ButtonGroup App-backControl">
        <Button onClick={openDrawer} type="link" icon={<MenuOutlined />} />
      </div>
    </div>
  );
};

Navigation.propTypes = {
  openDrawer: PropTypes.func.isRequired,
};

export default Navigation;
