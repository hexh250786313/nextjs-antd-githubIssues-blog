import { connect } from 'react-redux'
import { saveTimeline } from '../../redux/actions/home'
import { fetchBlogInfo } from '../../redux/actions/blog'
import { fetchPostList } from '../../redux/actions/post'
import Timeline from '../../components/Home/Timeline'

const mapStateToProps = state => ({
  currentList: state.home.timeline.currentList,
  currentPage: state.home.timeline.currentPage,
  open_issues_count: state.blog.info.open_issues_count,
  list: state.post.list,
})

const mapDispatchToProps = dispatch => ({
  saveTimeline: payload => dispatch(saveTimeline(payload)),
  fetchBlogInfo: payload => dispatch(fetchBlogInfo(payload)),
  fetchPostList: (payload, callback) => dispatch(fetchPostList(payload, callback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
