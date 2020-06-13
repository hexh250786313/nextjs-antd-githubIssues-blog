import { connect } from 'react-redux';
import { fetchPostDetail } from '../../redux/actions/post';
import PostDetail from '../../components/Post/PostDetail';

const mapStateToProps = state => ({
  detail: state.post.detail.detail,
});

const mapDispatchToProps = dispatch => ({
  fetchPostDetail(order) {
    dispatch(fetchPostDetail(order));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
