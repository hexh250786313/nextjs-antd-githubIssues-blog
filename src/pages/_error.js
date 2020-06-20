// import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from '../components/ErrorPage';

const Error = ({ statusCode }) => (
  <ErrorPage statusCode={statusCode || 200} />
);

Error.propTypes = {
  statusCode: PropTypes.number,
};

Error.defaultProps = {
  statusCode: 200,
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default Error;

// export default class Error extends React.Component {
// static propTypes = {
// statusCode: PropTypes.number
// }
// static defaultProps = {
// statusCode: 200
// }
// static getInitialProps({ res, err }) {
// const statusCode = res ? res.statusCode : err ? err.statusCode : null;
// return { statusCode };
// }

// render() {
// return (
// <ErrorPage statusCode={this.props.statusCode || 200} />
// );
// }
// }
