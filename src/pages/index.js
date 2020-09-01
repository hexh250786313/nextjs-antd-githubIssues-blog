import Home from '../components/Home'
import { fetchBlogInfo } from '../redux/actions/blog'
import { fetchTimeline } from '../redux/actions/home'
import { timelineQuery } from '../constants/ConstTypes'

Home.getInitialProps = async props => {
  const { isServer, store } = props.ctx
  if (isServer) {
    store.dispatch(fetchBlogInfo())
    store.dispatch(fetchTimeline(timelineQuery))
  }
  return { isServer }
}

export default Home
