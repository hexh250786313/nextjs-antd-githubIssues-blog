import PostDetail from '../../containers/post/detail'
import { fetchPostDetail } from '../../redux/actions/post'

PostDetail.getInitialProps = async props => {
  const {
    store,
    isServer,
    query: { number },
  } = props.ctx
  const payload = { number }
  // 进入 about 为何会经过这里
  debugger
  store.dispatch(fetchPostDetail(payload))
  return { isServer }
}

export default PostDetail
