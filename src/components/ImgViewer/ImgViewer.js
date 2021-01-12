import React, { useEffect, useRef, useState } from 'react'
import { useTranslate } from './hooks'
import ImgViewerHandler from './index'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import {
  PlusOutlined,
  MinusOutlined,
  RedoOutlined,
  CloseOutlined
} from '@ant-design/icons'

const ImgViewer = ({ imgUrl }) => {
  const viewerEl = useRef(null)
  const imgEl = useRef(null)
  const [translate, initTranslate] = useTranslate({
    container: viewerEl.current,
    dragItem: imgEl.current
  })
  const _handleHide = () => {
    ImgViewerHandler.hide()
  }
  const [scale, setScale] = useState(1)

  useEffect(() => {
    setScale(1)
    initTranslate()
  }, [imgUrl, initTranslate])

  return (
    <div className='viewer' ref={viewerEl}>
      <div className='tips'><p>利用鼠标拖拽或滑动手机屏幕可移动图片位置</p>
        <div onClick={_handleHide} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <CloseOutlined  style={{ fontSize: 20 }} />
        </div>
      </div>
      <img
        id='viewerq'
        ref={imgEl}
        src={imgUrl}
        alt={imgUrl}
        style={{
          transform: `scale(${scale}) translate3d(${translate.X / scale}px, ${
            translate.Y / scale
          }px, 0)`
        }}
        onClick={(e) => e.stopPropagation()}
      />
      <div className='buttons'>
        <div className='buttons-inner'>
          <Button
            shape='round'
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => setScale(scale * 1.2)}
          >
            放大
          </Button>
          <Button
            shape='round'
            type='primary'
            icon={<MinusOutlined />}
            onClick={() => setScale(scale / 1.2)}
          >
            缩小
          </Button>
          <Button
            shape='round'
            type='primary'
            icon={<RedoOutlined />}
            onClick={e => {
              setScale(1)
              initTranslate()
            }}
          >
            还原
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

        .tips {
          position: absolute;
          top: 0;
          width: 100%;
          background-color: rgba(255, 255, 255, 0.9);
          color: #2a2a2a;
          border-style: none;
          text-align: center;
          font-size: 22px;
          display: flex;
          z-index: 10000;
          padding:  0 15px;
        }

        .tips > p {
          width: 100%;
          padding: 15px 15px 15px 0;
          margin: 0;
        }

        .viewer img {
          width: 90vw;
          height: auto;
          cursor: move;
          position: fixed;
          transform: scale(1) translate3d(0, 0, 0);
          border-style: none;
          box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.5);
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
      `}
      </style>
    </div>
  )
}

ImgViewer.propTypes = {
  imgUrl: PropTypes.string
}

ImgViewer.defaultProps = {
  imgUrl: ''
}

export default ImgViewer
