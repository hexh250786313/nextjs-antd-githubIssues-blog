import PropTypes from 'prop-types';
import DynamicAntdTheme from 'dynamic-antd-theme';
import Header from './Header';
// import Progress from './Progress';
// import React from 'react';

const Layout = ({ children }) => (
  <>
    <style jsx>{`
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
    <Header />
    <div className="content-container">{children}</div>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      Change Theme:
      <DynamicAntdTheme
        style={{ display: 'flex', marginLeft: '10px' }}
        primaryColor="#52c41a"
        // themeChangeCallback={this.themeChangeCallback}
      />
    </div>
  </>
);

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
