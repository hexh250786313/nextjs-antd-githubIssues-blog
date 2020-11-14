import { memo } from 'react'
import { blogName } from '@/constants/ConstTypes'
import { color_primary } from '@/constants/CustomTheme'

export default memo(() => {
  return (
    <div className='footer'>
      Copyright © 2020 - 2020 {blogName}
      <style jsx>{`
        .footer {
          cursor: default;
          display: block;
          text-align: center;
          padding: 5rem 1.5rem 0rem;
          background-color: #fff;
          color: ${color_primary};
          contain: content;
          font-size: 1em;
          line-height: 1.5;
          font-weight: bold;
        }
      `}
      </style>
    </div>
  )
})
