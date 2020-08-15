import PostList from '../../containers/post/list'
import { fetchPostList } from '../../redux/actions/post'
import { getPostsAmount } from '../../redux/actions/post'

PostList.getInitialProps = async props => {
  const { store, isServer } = props.ctx
  if (isServer) {
    store.dispatch(fetchPostList())
    store.dispatch(getPostsAmount())
  }
  return { isServer }
}

export default PostList
