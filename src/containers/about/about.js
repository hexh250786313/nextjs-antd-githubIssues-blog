import { connect } from 'react-redux'
import PostDetail from '@/components/Post/PostDetail'
import { setTOC, handleHeaderChange } from '@/redux/actions/layout'
import { savePostState } from '@/redux/actions/post'
import { fetchAbout } from '@/redux/actions/about'

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
    dispatch(savePostState({}))
  },
  fetchPostDetail: () => dispatch(fetchAbout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
