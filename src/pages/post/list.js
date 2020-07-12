import PostList from '../../containers/post/list';
import { fetchPostList } from '../../redux/actions/post';

PostList.getInitialProps = async props => {
  const { store, isServer } = props.ctx;
  const payload = {
    // labels: `post`,
    page: 1,
    // per_page: 1,
    creator: `hexh250786313`,
    sort: `created`,
    direction: `desc`,
    state: `open`,
  };
  store.dispatch(fetchPostList(payload));
  return { isServer };
};

export default PostList;
