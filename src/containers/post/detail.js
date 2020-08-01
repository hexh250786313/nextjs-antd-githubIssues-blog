import { connect } from 'react-redux';
import { fetchPostDetail } from '../../redux/actions/post';
import PostDetail from '../../components/Post/PostDetail';
import { setTOC, handleHeaderChange } from '../../redux/actions/layout';

const mapStateToProps = state => ({
  detail: state.post.detail,
});

const mapDispatchToProps = dispatch => ({
  fetchPostDetail(number) {
    dispatch(fetchPostDetail(number));
  },
  setTOC(source) {
    dispatch(setTOC(source));
  },
  handleHeaderChange(payload) {
    dispatch(handleHeaderChange(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
