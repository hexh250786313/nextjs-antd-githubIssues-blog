import PostDetail from '../../containers/post/detail';
import { fetchPostDetail } from '../../redux/actions/post';

PostDetail.getInitialProps = async props => {
  const {
    store,
    isServer,
    query: { number },
  } = props.ctx;
  const payload = { number };
  store.dispatch(fetchPostDetail(payload));
  return { isServer };
};

export default PostDetail;
