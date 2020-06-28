import PropTypes from 'prop-types';
// import DynamicAntdTheme from 'dynamic-antd-theme';
import Drawer from '../../containers/layout/drawer';
import Navigation from '../../containers/layout/navigation';
import Header from '../../containers/layout/header';
import SideNavigation from './SideNavigation';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {
        // <Progress />
      }

      <Navigation />

      <Header />

      <Drawer />

      <div className="container-outer">
        <div className="container">
          <SideNavigation />
          <div className="main">
            {children}
          </div>
        </div>
      </div>
      {
        // <div
        // style={{
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        // }}
        // >
        // Change Theme:
        // <DynamicAntdTheme
        // style={{ display: 'flex', marginLeft: '10px' }}
        // primaryColor="#4D698E"
        // // themeChangeCallback={this.themeChangeCallback}
        // />
        // </div>
      }

      <style jsx>{`
        .layout {
          background-color: #fff;
          min-height: 100vh;
        }

        .layout:before {
          content: '';
          display: block;
          height: 46px;
        }

        .container {
          max-width: 1150px;
          width: 100%;
          display: flex;
          justify-content: space-between;
        }

        .container-outer {
          padding-top: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .main {
          width: 100%;
        }

        @media (min-width: 768px) {
          .container {
            padding: 0 42px;
          }

          .main {
            margin-left: 24px;
            padding: 0 0 40px;
          }
        }

        @media (max-width: 767px) {
          .main {
            padding: 0 12px 40px;
          }
        }

        :global(.ant-menu-vertical) {
          border-right: 0;
        }

        :global(.ant-drawer-title) {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

// themeChangeCallback = primaryColor => {
// const progress = document.getElementsByClassName('ant-progress-bg')[0];
// if (progress) {
// progress.style.boxShadow = `0px 0px 10px 1px ${primaryColor}`;
// }
// };

export default Layout;

Layout.propTypes = {
  children: PropTypes.any,
};

Layout.defaultProps = {
  children: null,
};
