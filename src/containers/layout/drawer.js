import { connect } from 'react-redux'
import {
  closeDrawer,
  handleSearchTextChange,
  fetchSearchResult,
} from '@/redux/actions/layout'
import Drawer from '@/components/Layout/Drawer'

const mapStateToProps = state => ({
  isShowDrawer: state.layout.drawer.isShowDrawer,
  searchText: state.layout.search.searchText,
  mdSource: state.layout.toc.source,
})

const mapDispatchToProps = dispatch => ({
  closeDrawer() {
    dispatch(closeDrawer())
  },
  handleSearchTextChange(searchText) {
    dispatch(handleSearchTextChange(searchText))
  },
  fetchSearchResult(searchText) {
    dispatch(fetchSearchResult)
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
