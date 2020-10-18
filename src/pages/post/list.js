import PostList from '@/containers/post/list'
import { fetchPostList } from '@/redux/actions/post'

PostList.getInitialProps = async props => {
  const { isServer, query: { page }, store } = props.ctx
  if (isServer) {
    const nextQueryParams = { page: page - 0 }
    store.dispatch(fetchPostList(nextQueryParams))
  }
  return { isServer }
}

export default PostList
