import React, { useEffect, useRef, useState } from 'react'
import { useTranslate } from './hooks'
import ImgViewerHandler from './index'
import PropTypes from 'prop-types'

const ImgViewer = ({ imgUrl }) => {
  const viewerEl = useRef(null)
  const imgEl = useRef(null)
  const storeRef = useRef({
    scaling: false
    // scale
  })
  const [translate, initTranslate] = useTranslate({
    container: viewerEl.current,
    dragItem: imgEl.current,
    scaling: storeRef.current.scaling,
  })
  const _handleHide = () => {
    ImgViewerHandler.hide()
  }
  const [scale, setScale] = useState(1)

  useEffect(() => {
    setScale(1)
    initTranslate()
  }, [imgUrl, initTranslate])

  useEffect(() => {
    if (viewerEl.current) {
      viewerEl.current.addEventListener('touchstart', event => {
        const touches = event.touches
        const events = touches[0]
        const events2 = touches[1]

        if (event.touches.length === 2) {
          event.preventDefault()
        }

        // 第一个触摸点的坐标
        storeRef.current.pageX = events.pageX
        storeRef.current.pageY = events.pageY

        storeRef.current.moveable = true

        if (events2) {
          storeRef.current.pageX2 = events2.pageX
          storeRef.current.pageY2 = events2.pageY
          storeRef.current.scaling = true
        }

        storeRef.current.originScale = storeRef.current.scale || 1
      })

      document.addEventListener('touchmove', event => {
        if (!storeRef.current.moveable) {
          return
        }

        if (event.touches.length === 2) {
          event.preventDefault()
        }

        const touches = event.touches
        const events = touches[0]
        const events2 = touches[1]
        // 双指移动
        if (events2) {
          // 第2个指头坐标在touchmove时候获取
          if (!storeRef.current.pageX2) {
            storeRef.current.pageX2 = events2.pageX
          }
          if (!storeRef.current.pageY2) {
            storeRef.current.pageY2 = events2.pageY
          }

          // 获取坐标之间的举例
          const getDistance = (start, stop) => {
            return Math.hypot(stop.x - start.x, stop.y - start.y)
          }
          // 双指缩放比例计算
          const zoom =
            getDistance(
              {
                x: events.pageX,
                y: events.pageY,
              },
              {
                x: events2.pageX,
                y: events2.pageY,
              },
            ) /
            getDistance(
              {
                x: storeRef.current.pageX,
                y: storeRef.current.pageY,
              },
              {
                x: storeRef.current.pageX2,
                y: storeRef.current.pageY2,
              },
            )
          // 应用在元素上的缩放比例
          let newScale = storeRef.current.originScale * zoom
          // 最大缩放比例限制
          // if (newScale > 3) {
          //   newScale = 3
          // } else if (newScale < 1) {
          //   newScale = 1
          // }
          // 记住使用的缩放值
          storeRef.current.scale = newScale
          // 图像应用缩放效果
          setScale(scale * newScale)

          document.addEventListener('touchend', () => {
            storeRef.current.moveable = false
            // setTimeout(() => {
              storeRef.current.scaling = false
            // }, 1000)

            delete storeRef.current.pageX2
            delete storeRef.current.pageY2
          })
          document.addEventListener('touchcancel', () => {
            storeRef.current.moveable = false
            // setTimeout(() => {
              storeRef.current.scaling = false
            // }, 1000)

            delete storeRef.current.pageX2
            delete storeRef.current.pageY2
          })
        }
      })
    }
  }, [viewerEl])

  return (
    <div
      className='viewer'
      ref={viewerEl}
      onClick={_handleHide}
      onWheel={e => {
        if (e.nativeEvent.deltaY >= 0) {
          setScale(scale / 1.03)
        } else {
          setScale(scale * 1.03)
        }
      }}
    >
      {/**
      <div className='tips'>
        <p>滚动鼠标/缩放手指缩放图片, 鼠标拖拽/滑动图片移动图片</p>
      </div>
*/}
      <img
        id='viewerq'
        ref={imgEl}
        src={imgUrl}
        alt={imgUrl}
        style={{
          transform: `scale(${scale}) translate3d(${translate.X /
            scale}px, ${translate.Y / scale}px, 0)`,
        }}
        onClick={e => e.stopPropagation()}
      />
      {/**
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
*/}
      <style jsx>
        {`
          .viewer {
            display: flex;
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 89%);
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
            padding: 0 15px;
          }

          .tips > p {
            width: 100%;
            padding: 15px 15px 15px 0;
            margin: 0;
          }

          .viewer img {
            width: 90vw;
            max-width: 767px;
            height: auto;
            cursor: move;
            position: fixed;
            transform: scale(1) translate3d(0, 0, 0);
            border-style: none;
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
  imgUrl: PropTypes.string,
}

ImgViewer.defaultProps = {
  imgUrl: '',
}

export default ImgViewer
