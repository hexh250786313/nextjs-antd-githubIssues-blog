import { connect } from 'react-redux';
import {
  closeDrawer,
  handleSearchTextChange,
} from '../../redux/actions/layout';
import Drawer from '../../components/Drawer';

const mapStateToProps = state => ({
  isShowDrawer: state.layout.drawer.isShowDrawer,
  searchText: state.layout.search.seachText,
});

const mapDispatchToProps = dispatch => ({
  closeDrawer() {
    dispatch(closeDrawer());
  },
  handleSearchTextChange(searchText) {
    dispatch(handleSearchTextChange(searchText));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
