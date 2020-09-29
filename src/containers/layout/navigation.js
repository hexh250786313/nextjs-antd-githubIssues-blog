import { connect } from 'react-redux'
import {
  openDrawer,
  handleSearchTextChange,
  fetchSearchResult,
} from '@/redux/actions/layout'
import Navigation from '@/components/Layout/Navigation'

const mapStateToProps = state => ({
  searchText: state.layout.search.searchText,
})

const mapDispatchToProps = dispatch => ({
  openDrawer() {
    dispatch(openDrawer())
  },
  handleSearchTextChange(searchText) {
    dispatch(handleSearchTextChange(searchText))
  },
  fetchSearchResult(searchText) {
    dispatch(fetchSearchResult)
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
