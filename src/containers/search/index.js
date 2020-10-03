import { connect } from 'react-redux'
import { fetchSearch, saveSearch } from '@/redux/actions/search'
import PostList from '@/components/Post/PostList'
import { changeHash, handleQueryParams, changeQuery } from '@/core/util'

const mapStateToProps = state => ({
  list: state.search.items,
  currentPage: state.search.query.page,
  perPage: state.search.query.per_page,
  postsAmount: state.search.total_count,
  keyword: state.search.query.keyword,
  loading: state.search.loading,
})

const mapDispatchToProps = dispatch => ({
  setLoading: loading => dispatch(saveSearch({ loading })),
  fetchPostList: (payload, callback) =>
    dispatch(fetchSearch(payload, callback)),
  onLoad: (keyword, currentPage) => {
    const nextQueryParams = {}
    if (!!window.location.hash) {
      nextQueryParams.page = window.location.hash.replace(`#`, ``) - 0
    }
    if (!!window.location.search) {
      nextQueryParams.q = handleQueryParams(
        decodeURI(window.location.search).replace(`?q=`, ``),
      )
    } else if (keyword) {
      nextQueryParams.q = handleQueryParams(keyword)
    }
    dispatch(
      fetchSearch(nextQueryParams, () => {
        changeQuery(nextQueryParams.q)
        changeHash(currentPage)
      }),
    )
  },
})

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onLoad: () =>
    dispatchProps.onLoad(stateProps.keyword, stateProps.currentPage),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(PostList)
