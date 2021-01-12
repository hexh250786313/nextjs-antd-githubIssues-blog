import { connect } from 'react-redux'
import SideNavigation from '@/components/Layout/SideNavigation'

const mapStateToProps = state => ({
  mdSource: state.layout.toc.source,
  currentPostListPage: state.post.list.query.page
})

export default connect(mapStateToProps)(SideNavigation)
