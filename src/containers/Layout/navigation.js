import { connect } from 'react-redux';
import { openDrawer } from '../../redux/actions/layout';
import Navigation from '../../components/Navigation';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  openDrawer() {
    dispatch(openDrawer());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
