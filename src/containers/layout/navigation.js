import { connect } from 'react-redux'
import { openDrawer } from '@/redux/actions/layout'
import { changeSearchKeyword, saveSearch } from '@/redux/actions/search'
import Navigation from '@/components/Layout/Navigation'

const mapStateToProps = state => ({
  searchKeyword: state.search.query.keyword,
})

const mapDispatchToProps = dispatch => ({
  openDrawer: () => dispatch(openDrawer()),
  setLoading: () => dispatch(saveSearch({ loading: true })),
  changeSearchKeyword: keyword => dispatch(changeSearchKeyword(keyword)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
