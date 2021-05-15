import { Spin } from 'antd'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { handleTagContent } from '@/core/util'
import CodeBlock from '../CodeBlock'
import Terms from './Term'
import './index.less'
import ImgViewer from '@/components/ImgViewer'

const PostDetail = ({
  fetchPostDetail,
  detail,
  setTOC,
  clearDetail,
  isShowTerm
}) => {
  let { body } = detail
  let images = handleTagContent(body, 'image')
  let desc = handleTagContent(body, 'desc')

  if (images) {
    images = images.split('--split--')
    body = handleTagContent(body, 'image', 'exec')
  }

  if (desc) {
    // desc = desc.replace(/^\s+|\s+$/g, ``) // 去除头尾空白
    desc = desc.replace(/^\r\n+|\r\n+$/g, '') // 去除头尾换行+回车
    body = handleTagContent(body, 'desc', 'exec')
  }

  if (body) {
    body = body.replace(/^\s+|\s+$/g, '')
    body = handleTagContent(body, 'header-img', 'exec')
  }

  useEffect(() => {
    if (!body) {
      fetchPostDetail()
    }

    const imgs = document.getElementsByTagName('img')

    imgs.forEach(imgEle => {
      imgEle.addEventListener('click', e => {
        ImgViewer.show(e.target.src)
      })
    })
  }, [body])

  useEffect(() => {
    return () => {
      setTOC('')
      clearDetail()
    }
  }, [])

  return (
    <div>
      <Spin style={{ minWidth: 0 }} spinning={!body}>
        <div className='wrapper'>
          {desc && <p className='desc'>{desc}</p>}
          {images && (
            <div className='pic'>
              {images.map(image => (
                <img src={image} alt='' key={image} />
              ))}
            </div>
          )}
          <ReactMarkdown
            className='markdown-body'
            source={body}
            renderers={{
              code: CodeBlock
            }}
            escapeHtml={false}
          />

          <a href={detail.html_url}>
            <p className='comment'>点击这里前往 Github 查看原文，交流意见~</p>
          </a>

          {body && isShowTerm ? <Terms /> : null}
        </div>
      </Spin>
      <style jsx>
        {`
          .wrapper {
            padding-top: 0;
            min-height: 50vh;
          }

          .pic {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
            flex-wrap: wrap;
          }

          .pic > img {
            width: 80%;
          }

          .desc {
            background-color: #dedede;
            font-size: 17px;
            border-radius: 5px;
            padding: 10px 20px;
            white-space: break-spaces;
          }

          .comment {
            margin: 50px 0 0;
            padding: 10px;
            border: 1px solid;
            border-radius: 10px;
          }
        `}
      </style>
    </div>
  )
}

PostDetail.propTypes = {
  detail: PropTypes.object.isRequired,
  setTOC: PropTypes.func.isRequired,
  clearDetail: PropTypes.func.isRequired,
  fetchPostDetail: PropTypes.func.isRequired,
  isShowTerm: PropTypes.bool.isRequired
}

export default PostDetail
