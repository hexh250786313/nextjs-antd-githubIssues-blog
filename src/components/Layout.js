import PropTypes from 'prop-types';
// import DynamicAntdTheme from 'dynamic-antd-theme';
import Drawer from '../containers/Layout/drawer';
// import Progress from './Progress';
// import React from 'react';
import Navigation from '../containers/Layout/navigation';
import { useState, useEffect } from 'react';

const Layout = ({ children }) => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    window.addEventListener(
      'scroll',
      () => {
        const scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0;
        // setScrollTop(e.target.scrollTop);
        setScrollTop(scrollTop);
      },
      false,
    );
  }, [setScrollTop]);

  return (
    <div id="app" className="App affix">
      <style jsx>{`
        .App {
          position: relative !important;
          padding-top: 52px;
          padding-bottom: 50px;
          overflow-x: hidden;
          min-height: 100vh;
        }

        .App:before {
          content: ' ';
          background: rgba(255, 255, 255, 0.98);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          border-bottom: 1px solid #e6ecf4;
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
          -webkit-transition: box-shadow 0.2s, -webkit-transform 0.2s;
          -o-transition: box-shadow 0.2s, -webkit-transform 0.2s;
          transition: box-shadow 0.2s, -webkit-transform 0.2s;
          border-bottom: 0;
          position: absolute;
          box-shadow: ${scrollTop ? '0 2px 6px rgba(0, 0, 0, 0.35)' : 'null'};
        }

        .affix.App:before {
          position: fixed;
        }

        @media (min-width: 768px) {
          .affix {
            position: fixed;
          }

          .App:before {
            height: 52px;
          }
        }

        @media (max-width: 767px) {
          .App {
            padding-top: 46px;
          }

          .App:before {
            height: 46px;
          }
        }

        .content-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 70px 20px 20px 20px;
          padding: 10px 20px;
          background-color: #fff;
        }
      `}</style>
      {
        // <Progress />
      }

      <Navigation />

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
