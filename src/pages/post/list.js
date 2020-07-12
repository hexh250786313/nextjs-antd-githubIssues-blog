import PostList from '../../containers/post/list';
import { fetchPostList } from '../../redux/actions/post';

PostList.getInitialProps = async props => {
  const { store, isServer } = props.ctx;
  const payload = {
    labels: `blog`,
    page: 1,
    per_page: 1,
  };
  store.dispatch(fetchPostList(payload));
  return { isServer };
};

export default PostList;
