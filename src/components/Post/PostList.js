import PropTypes from 'prop-types';
import Link from 'next/link';
// import ReactMarkdown from 'react-markdown';
import React from 'react';

export default class PostList extends React.Component {
  renderPostList = item => {
    const { number, title } = item;
    return (
      <Link href={`/user/[username]`} as={`/user/${number}`} key={number}>
        <a>{title}</a>
      </Link>
    );
  };

  render() {
    const { list: postList } = this.props;
    console.log('这里是列表', postList);
    return <div>{postList.map(item => this.renderPostList(item))}</div>;
  }
}

PostList.propTypes = {
  list: PropTypes.array.isRequired,
};
