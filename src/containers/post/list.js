import { connect } from 'react-redux';
import { fetchPostList } from '../../redux/actions/post';
import { fetchBlogInfo } from '../../redux/actions/blog';
import PostList from '../../components/Post/PostList';

const mapStateToProps = state => ({
  list: state.post.list.list,
  openIssuesCount: state.blog.info.openIssuesCount,
});

const mapDispatchToProps = dispatch => ({
  fetchPostList(payload) {
    dispatch(fetchPostList(payload));
  },
  fetchBlogInfo(payload) {
    dispatch(fetchBlogInfo(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
