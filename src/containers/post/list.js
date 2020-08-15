import { connect } from 'react-redux'
import { fetchPostList, getPostsAmount } from '../../redux/actions/post'
import PostList from '../../components/Post/PostList'

const mapStateToProps = state => ({
  list: state.post.list,
  currentPage: state.post.query.page,
  perPage: state.post.query.per_page,
  postsAmount: state.post.amount,
})

const mapDispatchToProps = dispatch => ({
  fetchPostList: (payload, callback) =>
    dispatch(fetchPostList(payload, callback)),
  getPostsAmount: payload => dispatch(getPostsAmount(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
