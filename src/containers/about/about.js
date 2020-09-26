import { connect } from 'react-redux'
import PostDetail from '@/components/Post/PostDetail'
import { setTOC, handleHeaderChange } from '@/redux/actions/layout'
import { fetchPostDetailSuccess } from '@/redux/actions/post'

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
  clearDetail() {
    dispatch(fetchPostDetailSuccess({}))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
