import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import React from 'react';
import CodeBlock from '../CodeBlock';
import './index.less';
import MarkdownNavbar from 'markdown-navbar';
import { Anchor } from 'antd';

export default class PostDetail extends React.Component {
  render() {
    let {
      detail: { title = '', body = '', number = '' },
    } = this.props;
    return (
      <div>
        <p>
          {number}
          {title}
        </p>
        <ReactMarkdown
          className='markdown-body'
          source={body}
          renderers={{
            code: CodeBlock,
          }}
          escapeHtml={false}
        ></ReactMarkdown>
        <Anchor style={{ position: `fixed`, top: 80, right: 0 }}>
          <div className='markNav-title'>文章目录</div>

          <div className='navigation'>
            <MarkdownNavbar ordered={false} source={body} />
          </div>
        </Anchor>
      </div>
    );
  }
}

PostDetail.propTypes = {
  detail: PropTypes.object.isRequired,
};
