import Search from '@/containers/search'

Search.getInitialProps = async props => {
  const { isServer } = props.ctx
  return { isServer }
}

export default Search
