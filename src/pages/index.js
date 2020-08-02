import Home from '../components/Home'
import { fetchPostList } from '../redux/actions/post'

const initialParams = {
  labels: undefined,
  page: 1,
  per_page: 10,
  noCache: true,
}

Home.getInitialProps = async props => {
  const { store, isServer } = props.ctx
  store.dispatch(fetchPostList(initialParams))
  return { isServer }
}

export default Home
