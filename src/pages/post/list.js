import PostList from '@/containers/post/list'

PostList.getInitialProps = async props => {
  const { isServer } = props.ctx
  return { isServer }
}

export default PostList
