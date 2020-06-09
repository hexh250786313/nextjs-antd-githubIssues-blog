import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import React from 'react';

export default class BlogDetail extends React.Component {
  render() {
    const { issuesList } = this.props;
    return (
      <ReactMarkdown
        source={issuesList[0] ? issuesList[0].body : ''}
        escapeHtml={false}
      ></ReactMarkdown>
    );
  }
}

BlogDetail.propTypes = {
  issuesList: PropTypes.array.isRequired,
};
