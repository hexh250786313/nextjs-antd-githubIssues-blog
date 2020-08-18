import { connect } from 'react-redux'
import PostDetail from '../../components/Post/PostDetail'
import { setTOC, handleHeaderChange } from '../../redux/actions/layout'

const mapStateToProps = state => ({
  detail: state.post.detail,
})

const mapDispatchToProps = dispatch => ({
  setTOC(source) {
    dispatch(setTOC(source))
  },
  handleHeaderChange(payload) {
    dispatch(handleHeaderChange(payload))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
