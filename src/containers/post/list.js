import { connect } from 'react-redux'
import { fetchPostList, saveListState } from '@/redux/actions/post'
import PostList from '@/components/Post/PostList'
import Router from 'next/router'
// import { message } from 'antd'
// import { handleQueryParams } from '@/core/util'

const handleHash = hash => {
  let page

  const pageReg = new RegExp('page=([\\d]+)$')

  if (hash.match(pageReg)) {
    page = hash.match(pageReg)[1] - 0
  } else {
    page = 1
  }

  return { page }
}

const handleHashAndQuery = () => {
  let nextQueryParams
  if (window.location.search) {
    nextQueryParams = handleHash(window.location.search)
  } else {
    nextQueryParams = { page: 1 }
  }

  return nextQueryParams
}

const mapStateToProps = state => ({
  list: state.post.list.items,
  currentPage: state.post.list.query.page,
  perPage: state.post.list.query.per_page,
  postsAmount: state.post.list.total_count,
  loading: state.post.list.loading,
  listType: 'list'
})

const mapDispatchToProps = dispatch => ({
  fetchPostList: (payload, callback) =>
    dispatch(fetchPostList(payload, callback)),
  onLoad: currentPage => {
    const _handleRouteChange = url => {
      if (url.indexOf('list') !== -1) {
        const nextQueryParams = handleHashAndQuery(currentPage)
        dispatch(fetchPostList(nextQueryParams))
      }
    }

    const nextQueryParams = handleHashAndQuery(currentPage)
    Router.events.on('routeChangeComplete', _handleRouteChange)

    dispatch(saveListState({ loading: true }))
    dispatch(fetchPostList(nextQueryParams))

    // 返回一个组件卸载时运行的方法，用来取消对 url 的监听
    return () => {
      Router.events.off('routeChangeComplete', _handleRouteChange)
    }
  },
  handlePaginationClick: () => dispatch(saveListState({ loading: true }))
})

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onLoad: () => dispatchProps.onLoad(stateProps.currentPage)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(PostList)
