import { connect } from 'react-redux'
import SideNavigation from '@/components/Layout/SideNavigation'

const mapStateToProps = state => ({
  mdSource: state.layout.toc.source,
})

// const mapDispatchToProps = () => ({});

export default connect(mapStateToProps)(SideNavigation)
