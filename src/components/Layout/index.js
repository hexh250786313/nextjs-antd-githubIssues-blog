import PropTypes from 'prop-types';
// import DynamicAntdTheme from 'dynamic-antd-theme';
import Drawer from '../../containers/Layout/drawer';
// import Drawer from './Drawer1';
// import Progress from './Progress';
// import React from 'react';
// import Navigation from '../../containers/Layout/navigation';
// import { useState, useEffect } from 'react';
import Navigation from '../../containers/Layout/navigation';
import Header from '../../containers/Layout/header';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {
        // <Progress />
      }

      <Navigation />

      <Header />

      <Drawer />

      <div className="content-container">{children}</div>
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
          height: 200vh;
          min-height: 100vh;
          min-width: 100vw;
        }

        .layout:before {
          content: '';
          display: block;
          height: 46px;
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
