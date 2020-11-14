import { connect } from 'react-redux'
import { handleHeaderChange } from '@/redux/actions/layout'
import Header from '@/components/Layout/Header'

const mapStateToProps = state => ({
  pic: state.layout.header.pic,
  title: state.layout.header.title
})

const mapDispatchToProps = dispatch => ({
  handleHeaderChange (payload) {
    dispatch(handleHeaderChange(payload))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
