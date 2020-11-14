import { memo, useState, useEffect } from 'react'
import { Button } from 'antd'
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined'

export default memo(() => {
  const [isShowButton, setIsShowButton] = useState(false)

  useEffect(() => {
    let scrollTop = 0
    if (process.browser) {
      window.addEventListener(
        'scroll',
        () => {
          const currtScrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0
          if (currtScrollTop > 0 && scrollTop === 0) {
            scrollTop = 1
            setIsShowButton(true)
          } else if (currtScrollTop === 0 && scrollTop > 0) {
            scrollTop = 0
            setIsShowButton(false)
          }
        },
        false
      )
    }

    return () => {
    }
  }, [])

  return (
    <>
      {
      isShowButton
        ? <div className='float'>
          <Button
            type='primary'
            size='large' shape='circle' icon={<ArrowUpOutlined />} onClick={() =>
              window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
          <style jsx>{`
        .float {
          position: fixed;
          bottom: 20px;
          right: 20px;
        }
      `}
          </style>
        </div>
        : null
    }
    </>
  )
})
