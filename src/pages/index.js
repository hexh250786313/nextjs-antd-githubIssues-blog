import Home from '../components/Home';
import { fetchPostList } from '../redux/actions/post';

Home.getInitialProps = async props => {
  const { store, isServer } = props.ctx;
  store.dispatch(fetchPostList());
  return { isServer };
};

export default Home;
