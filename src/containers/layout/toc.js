import { connect } from 'react-redux'
import TOC from '@/components/Layout/TOC'

const mapStateToProps = state => ({
  source: state.layout.toc.source,
})

export default connect(mapStateToProps)(TOC)
