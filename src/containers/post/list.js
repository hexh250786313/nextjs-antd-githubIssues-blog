import { connect } from 'react-redux'
import { fetchPostList, saveListState } from '@/redux/actions/post'
import PostList from '@/components/Post/PostList'
import Router from 'next/router'
// import { message } from 'antd'
// import { handleQueryParams } from '@/core/util'

const handleHash = hash => {
  let page

  const pageReg = new RegExp(`page=([\\d]+)$`)

  if (!!hash.match(pageReg)) {
    page = hash.match(pageReg)[1] - 0
  } else {
    page = 1
  }

  return { page }
}

const handleHashAndQuery = currentPage => {
  let nextQueryParams
  if (!!window.location.hash) {
    nextQueryParams = handleHash(window.location.hash)
  } else if (typeof currentPage === `number` && currentPage > 1) {
    Router.push(`/post/list#page=${currentPage}`)
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
})

const mapDispatchToProps = dispatch => ({
  fetchPostList: (payload, callback) =>
    dispatch(fetchPostList(payload, callback)),
  onLoad: currentPage => {
    const _handleRouteChange = url => {
      if (url.indexOf(`list`) !== -1) {
        const nextQueryParams = handleHashAndQuery(currentPage)
        dispatch(fetchPostList(nextQueryParams))
      }
    }

    const nextQueryParams = handleHashAndQuery(currentPage)
    Router.events.on('hashChangeComplete', _handleRouteChange)

    dispatch(fetchPostList(nextQueryParams))

    // 返回一个组件卸载时运行的方法，用来取消对 hash 的监听
    return () => {
      Router.events.off('hashChangeComplete', _handleRouteChange)
    }
  },
  handlePaginationClick: page => {
    if (!!window.location.hash || page) {
      dispatch(saveListState({ loading: true }))
      Router.push(`/post/list#page=${page}`)
    } else {
      Router.push(`/post/list#page=1`)
    }
  },
})

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onLoad: () => dispatchProps.onLoad(stateProps.currentPage),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(PostList)
