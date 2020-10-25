import { Spin } from 'antd'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { handleTagContent } from '@/core/util'
import CodeBlock from '../CodeBlock'
import './index.less'

const PostDetail = ({ fetchPostDetail, detail, setTOC, clearDetail }) => {
  let { body } = detail
  let images = handleTagContent(body, `image`)
  let desc = handleTagContent(body, `desc`)

  if (images) {
    images = images.split(`--split--`)
    body = handleTagContent(body, `image`, `exec`)
  }

  if (desc) {
    // desc = desc.replace(/^\s+|\s+$/g, ``) // 去除头尾空白
    desc = desc.replace(/^\r\n+|\r\n+$/g, ``) // 去除头尾换行+回车
    body = handleTagContent(body, `desc`, `exec`)
  }

  if (body) {
    body = body.replace(/^\s+|\s+$/g, ``)
    body = handleTagContent(body, `header-img`, `exec`)
  }

  useEffect(() => {
    if (!body) {
      fetchPostDetail()
    }
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
        <div className="wrapper">
          {desc && <p className="desc">{desc}</p>}
          {images && (
            <div className="pic">
              {images.map(image => (
                <img src={image} alt="" key={image} />
              ))}
            </div>
          )}
          <ReactMarkdown
            className="markdown-body"
            source={body}
            renderers={{
              code: CodeBlock,
            }}
            escapeHtml={false}
          />
        </div>
      </Spin>
      <style jsx>{`
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
      `}</style>
    </div>
  )
}

export default PostDetail

PostDetail.propTypes = {
  detail: PropTypes.object.isRequired,
  setTOC: PropTypes.func.isRequired,
  clearDetail: PropTypes.func.isRequired,
  fetchPostDetail: PropTypes.func.isRequired,
}
