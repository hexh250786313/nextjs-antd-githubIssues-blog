import { connect } from 'react-redux';
import { closeDrawer } from '../../redux/actions/layout';
import Drawer from '../../components/Drawer';

const mapStateToProps = state => ({
  isShowDrawer: state.layout.drawer.isShowDrawer,
});

const mapDispatchToProps = dispatch => ({
  closeDrawer() {
    dispatch(closeDrawer());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
