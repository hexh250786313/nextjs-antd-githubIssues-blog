import PropTypes from 'prop-types';
import { Spin, List } from 'antd';
import Router from 'next/router';
import { handleDescContent } from '../../core/util';

const PostList = ({ list: postList }) => {
  const handleClick = (e, href) => {
    e.preventDefault();
    Router.push(`/post/[number]`, href);
  };

  return (
    <div className="container">
      <Spin spinning={postList.length === 0}>
        <List>
          {postList.map(item => {
            const { number, title, body, updated_at } = item;
            return (
              <a
                key={number}
                href={`/post/${number}`}
                onClick={e => handleClick(e, `/post/${number}`)}
              >
                <List.Item>
                  <List.Item.Meta title={title} description={updated_at} />
                  <p className="description">{handleDescContent(body)}</p>
                </List.Item>
              </a>
            );
          })}
        </List>
      </Spin>
      <style jsx>{`
        :global(.container .ant-list-item) {
          flex-direction: column;
          align-items: flex-start;
          padding: 0;
          margin: 12px 0;
        }

        .description {
          margin: 0;
        }
      `}</style>
    </div>
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
