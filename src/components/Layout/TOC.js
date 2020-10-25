import MarkdownNavbar from 'markdown-navbar'
import './TOC.less'
import PropTypes from 'prop-types'

const removeHash = e => {
  setTimeout(() => {
    window.location.replace(
      window.location.href.toString().replace(window.location.hash, '') +
        '#' +
        e,
    )
  }, 100)
}

const TOC = ({ source }) => {
  return (
    <MarkdownNavbar
      ordered={false}
      headingTopOffset={-140}
      updateHashAuto={false}
      ordered={false}
      source={source}
      onHashChange={removeHash}
    />
  )
}

TOC.propTypes = {
  source: PropTypes.string.isRequired,
}

export default TOC
