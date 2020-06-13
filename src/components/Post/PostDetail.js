import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import React from 'react';

export default class PostDetail extends React.Component {
  render() {
    const {
      detail: { title = '', body = '', number = '' },
    } = this.props;
    return (
      <div>
        <p>
          {number}
          {title}
        </p>
        <ReactMarkdown source={body} escapeHtml={false}></ReactMarkdown>
        {
          // <ReactMarkdown
          // source={detail[0] ? detail[0].body : ''}
          // escapeHtml={false}
          // ></ReactMarkdown>
        }
      </div>
    );
  }
}

PostDetail.propTypes = {
  detail: PropTypes.object.isRequired,
};
