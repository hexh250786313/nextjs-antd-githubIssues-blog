import PropTypes from 'prop-types'
import { Drawer as AntDrawer } from 'antd'

const Drawer = ({ visible }) => {
  return <AntDrawer visible={visible}></AntDrawer>
}

Drawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  // closeDrawer: PropTypes.func.isRequired,
}

export default Drawer
