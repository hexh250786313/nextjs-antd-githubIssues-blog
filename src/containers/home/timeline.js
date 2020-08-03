import { connect } from 'react-redux'
import { saveTimeLine } from '../../redux/actions/home'
import Timeline from '../../components/Home/Timeline'

const mapStateToProps = state => ({
  prevList: state.home.timeline.list,
  prevPage: state.home.timeline.page,
  openIssuesCount: state.blog.info.openIssuesCount,
})

const mapDispatchToProps = dispatch => ({
  saveTimeLine(payload) {
    dispatch(saveTimeLine(payload))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
