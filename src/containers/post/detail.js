import { connect } from 'react-redux'
import PostDetail from '@/components/Post/PostDetail'
import { setTOC, handleHeaderChange } from '@/redux/actions/layout'
import { savePostState, fetchPostDetail } from '@/redux/actions/post'

const exec = str => {
  if (typeof str === `string`) {
    const reg = new RegExp(`\\d+$`)
    if (!!str.match(reg)) {
      return str.match(reg)[0]
    }
  }

  return ``
}

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
  fetchPostDetail: () =>
    dispatch(fetchPostDetail({ number: exec(window.location.pathname) })),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
