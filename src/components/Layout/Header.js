import Router from 'next/router'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import {
  indexPic,
  aboutPic,
  defaultPic,
  pageWihtoutDefaultHeader,
} from '@/constants/ConstTypes.js'

const Header = ({ handleHeaderChange, pic, title }) => {
  const handleChange = pathname => {
    switch (pathname) {
      case '/about':
        handleHeaderChange({
          pic: aboutPic,
        })
        break
      case '/post/list':
        handleHeaderChange({
          title: 'Posts List',
          pic: defaultPic,
        })
      default:
        if (
          !pageWihtoutDefaultHeader.some(str => pathname.indexOf(str) !== -1)
        ) {
          handleHeaderChange({
            title: "I'm looking for something fun. Are you going with me?",
            pic: indexPic,
          })
        }
        break
    }
  }

  useEffect(() => {
    Router.events.on('routeChangeComplete', pathname => {
      handleChange(pathname)
    })
    handleChange(window.location.pathname)
  }, [])

  return pic ? (
    <div className="header" style={{ backgroundImage: `url(${pic})` }}>
      <h1 className="title">{title}</h1>
      <style jsx>
        {`
          .header {
            background-repeat: no-repeat;
            background-size: 100% auto;
            background-position: center center;
            height: 140px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 12px;
          }

          .header:before {
            content: '';
            display: block;
            position: absolute;
            height: 140px;
            top: 0;
            left: 0;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.3);
          }

          .title {
            color: #fff;
            margin: 0;
            z-index: 0;
          }
        `}
      </style>
    </div>
  ) : null
}

Header.propTypes = {
  handleHeaderChange: PropTypes.func.isRequired,
  pic: PropTypes.string,
  title: PropTypes.string,
}

Header.defaultProps = {
  pic: '',
  title: '',
}

export default Header
