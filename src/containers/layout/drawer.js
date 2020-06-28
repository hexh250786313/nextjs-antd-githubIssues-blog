import { connect } from 'react-redux';
import {
  closeDrawer,
  handleSearchTextChange,
} from '../../redux/actions/layout';
import Drawer from '../../components/Layout/Drawer';

const mapStateToProps = state => ({
  isShowDrawer: state.layout.drawer.isShowDrawer,
  searchText: state.layout.search.searchText,
  mdSource: state.layout.toc.source,
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
