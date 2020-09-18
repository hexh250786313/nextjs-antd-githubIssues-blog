import PostDetail from '../containers/post/detail'
import { fetchAbout } from '../redux/actions/about'

PostDetail.getInitialProps = async props => {
  const { store, isServer } = props.ctx
  store.dispatch(fetchAbout())
  return { isServer }
}

export default PostDetail
