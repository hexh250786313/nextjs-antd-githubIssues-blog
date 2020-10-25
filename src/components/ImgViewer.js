import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import {
  PlusOutlined,
  MinusOutlined,
  RedoOutlined,
  CloseOutlined,
} from '@ant-design/icons'

const originWidth = `90%`

const ImgViewer = ({ imgUrl }) => {
  const viewerEl = useRef(null)
  const imgEl = useRef(null)
  const [imgStyle, setImgStyle] = useState({ width: originWidth })
  let isMoving = false
  const positionStore = { X: 0, Y: 0, imgTop: 0, imgLeft: 0 }

  const _handleClick = () => {
    ImgViewerHandler.hide()
  }

  useEffect(() => {
    viewerEl.current.addEventListener(`touchmove`, e => {
      e.preventDefault()
    })

    imgEl.current.addEventListener(`dragstart`, e => {
      e.preventDefault()
      isMoving = true
    })

    imgEl.current.addEventListener(`mousedown`, () => {
      isMoving = true
    })

    imgEl.current.addEventListener(`mouseup`, () => {
      isMoving = false
    })

    imgEl.current.addEventListener(`mousemove`, e => {
      if (isMoving) {
        const { clientX, clientY } = e
        const { offsetTop, offsetLeft } = imgEl.current
        const { X, Y } = positionStore
        if (!!Y && !!X) {
          const top = offsetTop - (Y - clientY)
          const left = offsetLeft - (X - clientX)
          setImgStyle({ ...imgStyle, top, left })
        }
        // positionStore.imgTop = top
        // positionStore.imgLeft = offsetLeft
        positionStore.Y = clientY
        positionStore.X = clientX
      }
    })
  }, [])

  useEffect(() => {
    setImgStyle({ width: originWidth })
  }, [imgUrl])

  const _handleZoom = type => {
    const width = imgEl.current.width
    switch (type) {
      case 'in':
        setImgStyle({ width: width * 1.2 + `px` })
        break
      case 'out':
        setImgStyle({ width: width / 1.2 + `px` })
        break
      case 'recover':
        setImgStyle({ width: originWidth })
        break
      default:
    }
  }

  return (
    <div className="viewer" ref={viewerEl} onClick={_handleClick}>
      <img
        ref={imgEl}
        src={imgUrl}
        alt={imgUrl}
        style={imgStyle}
        onClick={e => e.stopPropagation()}
      />
      <div className="buttons">
        <div className="buttons-inner">
          <Button
            shape="round"
            type="primary"
            icon={<PlusOutlined />}
            onClick={e => {
              e.stopPropagation()
              _handleZoom(`in`)
            }}
          >
            放大
          </Button>
          <Button
            shape="round"
            type="primary"
            icon={<MinusOutlined />}
            onClick={e => {
              e.stopPropagation()
              _handleZoom(`out`)
            }}
          >
            缩小
          </Button>
          <Button
            shape="round"
            type="primary"
            icon={<RedoOutlined />}
            onClick={e => {
              e.stopPropagation()
              _handleZoom(`recover`)
            }}
          >
            还原
          </Button>
          <Button shape="round" type="primary" icon={<CloseOutlined />}>
            关闭
          </Button>
        </div>
      </div>
      <style jsx>{`
        .viewer {
          display: flex;
          position: fixed;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.9);
          top: 0;
          left: 0;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .viewer img {
          width: ${originWidth};
          height: auto;
          cursor: move;
          position: fixed;
        }

        .buttons {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          bottom: 70px;
          height: 0;
        }

        .buttons-inner {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }

        :global(.buttons .ant-btn) {
          margin: 0 10px 10px;
        }
      `}</style>
    </div>
  )
}

ImgViewer.propTypes = {
  imgUrl: PropTypes.string,
}

ImgViewer.defaultProps = {
  imgUrl: ``,
}

const imgViewerStore = {
  isShow: false,
  viewer: !!process.browser ? document.createElement(`div`) : null,
  body: !!process.browser ? document.body : null,
  html: !!process.browser ? document.documentElement : null,
  htmlStyle: { overflow: `` },
  bodyStyle: { overflow: ``, position: `` },
}

const ImgViewerHandler = {
  show: url => {
    if (!!process.browser) {
      const _ImgViewer = <ImgViewer imgUrl={url} />
      const { isShow, viewer, body, html } = imgViewerStore
      if (!isShow && !!viewer && !!body && !!html) {
        imgViewerStore.isShow = true

        imgViewerStore.htmlStyle.overflow = html.style.overflow
        imgViewerStore.bodyStyle.overflow = body.style.overflow
        imgViewerStore.bodyStyle.position = body.style.position
        html.style.overflow = `hidden`
        body.style.overflow = `hidden`
        body.style.position = `relative`

        body.appendChild(viewer)
        ReactDOM.render(_ImgViewer, viewer)
      }
    }
  },
  hide: () => {
    const { html, body, viewer, isShow } = imgViewerStore
    if (!!isShow && !!viewer && !!body && !!html) {
      imgViewerStore.isShow = false

      html.style.overflow = imgViewerStore.htmlStyle.overflow
      body.style.overflow = imgViewerStore.bodyStyle.overflow
      body.style.position = imgViewerStore.bodyStyle.position

      html.classList.remove(`noscroll`)
      body.removeChild(viewer)
    }
  },
}

export default ImgViewerHandler
