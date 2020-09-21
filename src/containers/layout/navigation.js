import { connect } from 'react-redux'
import { openDrawer, handleSearchTextChange } from '@/redux/actions/layout'
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
