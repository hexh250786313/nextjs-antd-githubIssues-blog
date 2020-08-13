import { connect } from 'react-redux'
import { saveTimeline } from '../../redux/actions/TimelineAction'
import { fetchBlogInfo } from '../../redux/actions/CommonAction'
import Timeline from '../../components/Home/Timeline'

const mapStateToProps = state => ({
  prevList: state.home.timeline.currentList,
  prevPage: state.home.timeline.currentPage,
  open_issues_count: state.blog.info.open_issues_count,
})

const mapDispatchToProps = dispatch => ({
  saveTimeLine(payload) {
    return dispatch(saveTimeline(payload))
  },
  fetchBlogInfo(payload) {
    return dispatch(fetchBlogInfo(payload))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
