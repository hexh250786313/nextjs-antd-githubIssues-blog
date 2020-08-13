import Home from '../components/Home'

Home.getInitialProps = async props => {
  const { isServer } = props.ctx
  return { isServer }
}

export default Home
