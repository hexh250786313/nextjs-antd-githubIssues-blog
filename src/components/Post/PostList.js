import PropTypes from 'prop-types';
import Link from 'next/link';
// import React from 'react';
import { Spin } from 'antd';

const PostList = ({ list: postList }) => {
  return (
    <Spin spinning={postList.length === 0}>
      <div>
        {postList.map(item => {
          const { number, title } = item;
          return (
            <Link href={`/post/[number]`} as={`/post/${number}`} key={number}>
              <a>{title}</a>
            </Link>
          );
        })}
      </div>
    </Spin>
  );
};

export default PostList;

// export default class PostList extends React.Component {
// renderPostList = item => {
// const { number, title } = item;
// return (
// <Link href={`/post/[number]`} as={`/post/${number}`} key={number}>
// <a>{title}</a>
// </Link>
// );
// };

// render() {
// const { list: postList } = this.props;

// return (
// <Spin delay={1000} spinning={postList.length === 0}>
// <div>{postList.map(item => this.renderPostList(item))}</div>
// </Spin>
// );
// }
// }

PostList.propTypes = {
  list: PropTypes.array.isRequired,
};
