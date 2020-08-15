import Home from '../components/Home'
import { fetchBlogInfo } from '../redux/actions/blog'
import { fetchPostList } from '../redux/actions/post'
import { timelineQuery } from '../constants/ConstTypes'

Home.getInitialProps = async props => {
  const { isServer, store } = props.ctx
  if (isServer) {
    store.dispatch(fetchBlogInfo())
    store.dispatch(fetchPostList(timelineQuery))
  }
  return { isServer }
}

export default Home
