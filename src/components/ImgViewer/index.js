import ReactDOM from 'react-dom'
import React from 'react'
import ImgViewer from './ImgViewer.js'

const imgViewerStore = {
  isShow: false,
  viewer: process.browser ? document.createElement('div') : null,
  body: process.browser ? document.body : null,
  html: process.browser ? document.documentElement : null,
  htmlStyle: { overflow: '' },
  bodyStyle: { overflow: '', position: '' }
}

const ImgViewerHandler = {
  show: (url) => {
    if (process.browser) {
      const _ImgViewer = <ImgViewer imgUrl={url} />
      const { isShow, viewer, body, html } = imgViewerStore
      if (!isShow && !!viewer && !!body && !!html) {
        imgViewerStore.isShow = true

        imgViewerStore.htmlStyle.overflow = html.style.overflow
        imgViewerStore.bodyStyle.overflow = body.style.overflow
        imgViewerStore.bodyStyle.position = body.style.position
        html.style.overflow = 'hidden'
        body.style.overflow = 'hidden'
        body.style.position = 'relative'

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

      body.removeChild(viewer)
    }
  }
}

export default ImgViewerHandler
