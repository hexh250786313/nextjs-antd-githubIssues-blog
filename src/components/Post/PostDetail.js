import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
// import React from 'react';
import CodeBlock from '../CodeBlock';
import './index.less';
import MarkdownNavbar from 'markdown-navbar';
import { Spin, Anchor } from 'antd';

const removeHash = e => {
  setTimeout(() => {
    window.location.replace(
      window.location.href.toString().replace(window.location.hash, '') +
        '#' +
        e,
    );
    // console.log(
    // window.location.href.toString().replace(window.location.hash, '') +
    // '#' +
    // e,
    // );
  }, 500);
};

const PostDetail = ({ detail }) => {
  const { title = '', body = '', number = '' } = detail;

  return (
    <div>
      <Spin spinning={!body}>
        <div>
          <p>
            {number}
            {title}
          </p>
          <ReactMarkdown
            className="markdown-body"
            source={body}
            renderers={{
              code: CodeBlock,
            }}
            escapeHtml={false}
          ></ReactMarkdown>
          <Anchor style={{ position: `fixed`, top: 80, right: 0 }}>
            <div className="markNav-title">TOC</div>
            <div className="navigation">
              <MarkdownNavbar
                headingTopOffset={-165}
                // updateHashAuto={false}
                ordered={false}
                source={body}
                onHashChange={removeHash}
              />
            </div>
          </Anchor>
        </div>
      </Spin>
    </div>
  );
};

// export default class PostDetail extends React.Component {
// render() {
// let {
// detail: { title = '', body = '', number = '' },
// } = this.props;
// return (
// <Spin delay={1000} spinning={!body}>
// <div>
// <p>
// {number}
// {title}
// </p>
// <ReactMarkdown
// className="markdown-body"
// source={body}
// renderers={{
// code: CodeBlock,
// }}
// escapeHtml={false}
// ></ReactMarkdown>
// <Anchor style={{ position: `fixed`, top: 80, right: 0 }}>
// <div className="markNav-title">文章目录</div>

// <div className="navigation">
// <MarkdownNavbar ordered={false} source={body} />
// </div>
// </Anchor>
// </div>
// </Spin>
// );
// }
// }

export default PostDetail;

PostDetail.propTypes = {
  detail: PropTypes.object.isRequired,
};
