import { connect } from 'react-redux'
import { closeDrawer } from '@/redux/actions/layout'
import {
  fetchSearch,
  changeSearchKeyword,
  saveSearch,
} from '@/redux/actions/search'
import Drawer from '@/components/Layout/Drawer'
import { changeQuery, changeHash, handleQueryParams } from '@/core/util'

const mapStateToProps = state => ({
  isShowDrawer: state.layout.drawer.isShowDrawer,
  mdSource: state.layout.toc.source,
  searchKeyword: state.search.query.keyword,
})

const mapDispatchToProps = dispatch => ({
  closeDrawer: () => dispatch(closeDrawer()),
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

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
