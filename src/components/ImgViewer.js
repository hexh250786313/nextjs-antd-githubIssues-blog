import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { useEffect, useRef } from 'react'

const ImgViewer = ({ imgUrl }) => {
  const viewerEl = useRef(null)

  const _handleClick = () => {
    ImgViewerHandler.hide()
  }

  useEffect(() => {
    viewerEl.current.addEventListener(`touchmove`, e => {
      e.preventDefault()
    })
  }, [])

  return (
    <div className="viewer" ref={viewerEl} onClick={_handleClick}>
      <img
        src={imgUrl}
        alt={imgUrl}
        // onClick={e => e.stopPropagation()}
      />
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
          width: 90%;
          height: auto;
          cursor: move;
          max-width: 1000px;
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
