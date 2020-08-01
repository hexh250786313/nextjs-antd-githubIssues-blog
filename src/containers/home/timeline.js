import { connect } from 'react-redux';
import { fetchPostList } from '../../redux/actions/post';
import Timeline from '../../components/Home/Timeline';

const mapStateToProps = state => ({
  list: state.post.list,
});

const mapDispatchToProps = dispatch => ({
  fetchPostList() {
    dispatch(fetchPostList());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
