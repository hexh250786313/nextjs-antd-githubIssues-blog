import { Spin } from 'antd'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { handleDescContent } from '../../core/util'
import CodeBlock from '../CodeBlock'
import './index.less'

const PostDetail = ({ detail, setTOC, handleHeaderChange }) => {
  const { title = '', body: _body } = detail
  const body = _body ? handleDescContent(_body, `exec`) : ``

  useEffect(() => {
    if (body) {
      setTOC(body)
      handleHeaderChange({
        title: title,
      })
    }
  })

  useEffect(() => {
    return () => {
      setTOC('')
    }
  }, [])

  return (
    <div>
      <Spin style={{ minWidth: 0 }} spinning={!body}>
        <ReactMarkdown
          className="markdown-body"
          source={body}
          renderers={{
            code: CodeBlock,
          }}
          escapeHtml={false}
        />
      </Spin>
    </div>
  )
}

export default PostDetail

PostDetail.propTypes = {
  detail: PropTypes.object.isRequired,
  setTOC: PropTypes.func.isRequired,
  handleHeaderChange: PropTypes.func.isRequired,
}
