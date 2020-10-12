import { connect } from 'react-redux'
import { saveTimeline, fetchTimeline } from '@/redux/actions/home'
import { fetchBlogInfo } from '@/redux/actions/global'
import Timeline from '@/components/Home/Timeline'

const mapStateToProps = state => ({
  currentList: state.home.timeline.currentList,
  currentPage: state.home.timeline.currentPage,
  open_issues_count: state.global.info.open_issues_count,
  list: state.home.timeline,
})

const mapDispatchToProps = dispatch => ({
  saveTimeline: payload => dispatch(saveTimeline(payload)),
  fetchBlogInfo: payload => dispatch(fetchBlogInfo(payload)),
  fetchTimeline: (payload, callback) =>
    dispatch(fetchTimeline(payload, callback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
