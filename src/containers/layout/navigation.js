import { connect } from 'react-redux'
import { openDrawer } from '@/redux/actions/layout'
import {
  fetchSearch,
  changeSearchKeyword,
  saveSearch,
} from '@/redux/actions/search'
import Navigation from '@/components/Layout/Navigation'
import { changeQuery, changeHash, handleQueryParams } from '@/core/util'

const mapStateToProps = state => ({
  searchKeyword: state.search.query.keyword,
})

const mapDispatchToProps = dispatch => ({
  openDrawer: () => dispatch(openDrawer()),
  fetchSearch: keyword => {
    dispatch(
      saveSearch({
        loading: true,
      }),
    )
    dispatch(
      fetchSearch({ q: handleQueryParams(keyword), page: 1 }, () => {
        changeQuery(keyword)
        changeHash(`1`)
      }),
    )
  },
  changeSearchKeyword: keyword => dispatch(changeSearchKeyword(keyword)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
