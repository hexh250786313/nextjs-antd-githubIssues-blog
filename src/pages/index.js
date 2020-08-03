import Home from '../components/Home'
import { fetchBlogInfo } from '../redux/actions/blog'

Home.getInitialProps = async props => {
  const { store, isServer } = props.ctx
  store.dispatch(fetchBlogInfo())
  return { isServer }
}

export default Home
