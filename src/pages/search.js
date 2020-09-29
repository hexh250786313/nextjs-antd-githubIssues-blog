import PostList from '@/containers/post/list'
import { fetchSearchResult } from '@/redux/actions/layout'

PostList.getInitialProps = async props => {
  const {
    store,
    isServer,
    query: { q },
  } = props.ctx
  if (isServer && !!q) {
    console.log(`查询关键词`, q)
    store.dispatch(fetchSearchResult({ q }))
  }
  return { isServer }
}

export default PostList
