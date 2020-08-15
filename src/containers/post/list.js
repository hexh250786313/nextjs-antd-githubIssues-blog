import { connect } from 'react-redux'
import { fetchPostList } from '../../redux/actions/post'
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
})

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
