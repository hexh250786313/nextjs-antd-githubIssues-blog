import { connect } from 'react-redux'
import { fetchSearch, saveSearch } from '@/redux/actions/search'
import PostList from '@/components/Post/PostList'
import Router from 'next/router'
import { message } from 'antd'
import { handleQueryParams } from '@/core/util'

const handleInvalidParams = () => {
  window.history.back()
  message.info(`请输入搜索关键字`)
}

const handleHash = hash => {
  let q, page, keyword

  const qReg = new RegExp(`q=([\\s\\S]+)&`)
  const pageReg = new RegExp(`page=([\\s\\S]+)`)

  if (!!hash.match(qReg)) {
    keyword = decodeURI(hash.match(qReg)[1])
    q = handleQueryParams(keyword)
  } else {
    handleInvalidParams()
  }

  if (!!hash.match(pageReg)) {
    page = hash.match(pageReg)[1] - 0
  } else {
    page = 1
  }

  return {
    q,
    page,
    keyword,
  }
}

const handleHashAndQuery = () => {
  let nextQueryParams
  if (!!window.location.hash) {
    nextQueryParams = handleHash(window.location.hash)
  } else {
    handleInvalidParams()
  }

  return nextQueryParams
}

const mapStateToProps = state => ({
  list: state.search.items,
  currentPage: state.search.query.page,
  perPage: state.search.query.per_page,
  postsAmount: state.search.total_count,
  keyword: state.search.query.keyword,
  loading: state.search.loading,
})

const mapDispatchToProps = dispatch => ({
  fetchPostList: (payload, callback) =>
    dispatch(fetchSearch(payload, callback)),
  onLoad: () => {
    const handleRouteChange = url => {
      if (url.indexOf(`search`) !== -1) {
        const nextQueryParams = handleHashAndQuery()
        dispatch(fetchSearch(nextQueryParams))
      }
    }

    const nextQueryParams = handleHashAndQuery()
    Router.events.on('hashChangeComplete', handleRouteChange)

    dispatch(fetchSearch(nextQueryParams))

    // 返回一个组件卸载时运行的方法，用来取消对 hash 的监听
    return () => {
      Router.events.off('hashChangeComplete', handleRouteChange)
    }
  },
  handlePaginationClick: (page, keyword) => {
    if (!!window.location.hash) {
      dispatch(saveSearch({ loading: true }))
      Router.push(`/search#q=${keyword}&page=${page}`)
    } else {
      handleInvalidParams()
    }
  },
})

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  handlePaginationClick: page =>
    dispatchProps.handlePaginationClick(page, stateProps.keyword),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(PostList)
