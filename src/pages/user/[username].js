import UserDetail from '../../containers/user/issue';
import { fetchIssue } from '../../redux/actions/user';

UserDetail.getInitialProps = async props => {
  const { store, isServer } = props.ctx;
  store.dispatch(fetchIssue());
  return { isServer };
};

export default UserDetail;
