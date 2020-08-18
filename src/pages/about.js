import PostDetail from '../containers/post/detail'
import { fetchPostList, fetchPostDetailSuccess } from '../redux/actions/post'

PostDetail.getInitialProps = async props => {
  const { store, isServer } = props.ctx
  store.dispatch(
    fetchPostList({ labels: `about`, noCache: true }, list =>
      store.dispatch(fetchPostDetailSuccess(list[0] || {})),
    ),
  )
  return { isServer }
}

export default PostDetail
