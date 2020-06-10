import { connect } from 'react-redux';
import { fetchIssue } from '../../redux/actions/user';
import UserDetail from '../../components/User/UserDetail';

const mapStateToProps = state => ({
  list: state.user.list.list,
  issuesList: state.user.list.issuesList,
  issue: state.user.list.issue,
});

const mapDispatchToProps = dispatch => ({
  fetchUserList() {
    dispatch(fetchIssue());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDetail);
