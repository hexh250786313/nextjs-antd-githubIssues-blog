import PropTypes from 'prop-types';
// import { fetchIssue } from '../../redux/actions/user';

const UserDetail = props => {
  const { router, issue } = props;
  return (
    <div>
      <h1>用户信息：{router.query.username}</h1>
      <div>{issue ? issue.body : ''}</div>
    </div>
  );
};

export default UserDetail;

UserDetail.propTypes = {
  router: PropTypes.object.isRequired,
  issue: PropTypes.object.isRequired,
};
