import { connect } from 'react-redux';
import { fetchPostList } from '../../redux/actions/post';
import PostList from '../../components/Post/PostList';

const mapStateToProps = state => ({
  list: state.post.list.list,
  openIssuesCount: state.post.list.openIssuesCount,
});

const mapDispatchToProps = dispatch => ({
  fetchPostList(payload) {
    dispatch(fetchPostList(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
