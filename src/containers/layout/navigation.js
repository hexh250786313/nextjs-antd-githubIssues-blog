import { connect } from 'react-redux'
import { openDrawer } from '@/redux/actions/layout'
import { changeSearchKeyword } from '@/redux/actions/search'
import Navigation from '@/components/Layout/Navigation'

const mapStateToProps = state => ({
  searchKeyword: state.search.query.keyword,
  currentPostListPage: state.post.list.query.page
})

const mapDispatchToProps = dispatch => ({
  openDrawer: () => dispatch(openDrawer()),
  changeSearchKeyword: keyword => dispatch(changeSearchKeyword(keyword))
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
