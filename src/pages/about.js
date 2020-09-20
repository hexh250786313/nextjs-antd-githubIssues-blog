// import PostDetail from '../containers/post/detail'
import ErrorPage from '../components/ErrorPage'
import { fetchAbout } from '../redux/actions/about'

ErrorPage.getInitialProps = async props => {
  const { store, isServer } = props.ctx
  store.dispatch(fetchAbout())
  return { isServer }
}

export default ErrorPage
