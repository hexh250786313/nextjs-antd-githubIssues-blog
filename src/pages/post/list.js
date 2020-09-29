import PostList from '@/containers/post/list'
import { fetchPostList } from '@/redux/actions/post'

PostList.getInitialProps = async props => {
  const { store, isServer } = props.ctx
  if (isServer) {
    store.dispatch(fetchPostList())
  }
  return { isServer }
}

export default PostList
