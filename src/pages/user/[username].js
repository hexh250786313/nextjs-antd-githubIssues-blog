import UserDetail from '../../containers/user/issue';
import { fetchIssue } from '../../redux/actions/user';

UserDetail.getInitialProps = async props => {
  const {
    store,
    isServer,
    query: { username },
  } = props.ctx;
  store.dispatch(fetchIssue(username));
  return { isServer };
};

export default UserDetail;
