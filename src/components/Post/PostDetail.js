import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
// import React from 'react';
import CodeBlock from '../CodeBlock';
import './index.less';
// import MarkdownNavbar from 'markdown-navbar';
import { Spin } from 'antd';
import { useEffect } from 'react';

// const removeHash = e => {
// setTimeout(() => {
// window.location.replace(
// window.location.href.toString().replace(window.location.hash, '') +
// '#' +
// e,
// );
// // console.log(
// // window.location.href.toString().replace(window.location.hash, '') +
// // '#' +
// // e,
// // );
// }, 100);
// };

const PostDetail = ({ detail, setTOC, handleHeaderChange }) => {
  const { title = '', body = '' } = detail;

  useEffect(() => {
    if (body) {
      setTOC(body);
      handleHeaderChange({
        title: title
      });
    }
  });

  useEffect(() => {
    return () => {
      setTOC('');
    };
  }, []);

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
        ></ReactMarkdown>
        {
          // body ? (
          // <Anchor style={{ position: `fixed`, top: 80, right: 0 }}>
          // <div className="markNav-title">TOC</div>
          // <div className="navigation">
          // <MarkdownNavbar
          // headingTopOffset={-165}
          // updateHashAuto={false}
          // ordered={false}
          // source={body}
          // onHashChange={removeHash}
          // />
          // </div>
          // </Anchor>
          // ) : null
        }
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
  setTOC: PropTypes.func.isRequired,
  handleHeaderChange: PropTypes.func.isRequired,
};
