import PropTypes from 'prop-types';
import Link from 'next/link';
import React from 'react';
import { Spin } from 'antd';

export default class PostList extends React.Component {
  renderPostList = item => {
    const { number, title } = item;
    return (
      <Link href={`/post/[number]`} as={`/post/${number}`} key={number}>
        <a>{title}</a>
      </Link>
    );
  };

  render() {
    const { list: postList } = this.props;
    if (postList.length === 0) {
      return <Spin />;
    }
    return <div>{postList.map(item => this.renderPostList(item))}</div>;
  }
}

PostList.propTypes = {
  list: PropTypes.array.isRequired,
};
