import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import theme from 'react-syntax-highlighter/dist/cjs/styles/prism/solarizedlight'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'

const CodeBlock = ({ value, language }) => {
  useEffect(() => {
    // 注册要高亮的语法，
    // 注意：如果不设置打包后供第三方使用是不起作用的
    SyntaxHighlighter.registerLanguage('jsx', jsx)
    SyntaxHighlighter.registerLanguage('javascript', javascript)
    SyntaxHighlighter.registerLanguage('js', javascript)
    SyntaxHighlighter.registerLanguage('shell', bash)
  }, [])

  return (
    <figure className="highlight">
      <SyntaxHighlighter language={language} style={theme}>
        {value}
      </SyntaxHighlighter>
    </figure>
  )
}

CodeBlock.defaultProps = {
  language: null,
}

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string,
}

// class CodeBlock extends React.PureComponent {
// static propTypes = {
// value: PropTypes.string.isRequired,
// language: PropTypes.string,
// };

// static defaultProps = {
// language: null,
// };

// componentDidMount() {
// // 注册要高亮的语法，
// // 注意：如果不设置打包后供第三方使用是不起作用的
// SyntaxHighlighter.registerLanguage('jsx', jsx);
// SyntaxHighlighter.registerLanguage('javascript', javascript);
// SyntaxHighlighter.registerLanguage('js', javascript);
// SyntaxHighlighter.registerLanguage('shell', bash);
// }

// render() {
// const { language, value } = this.props;
// return (
// <figure className="highlight">
// <SyntaxHighlighter language={language} style={theme}>
// {value}
// </SyntaxHighlighter>
// </figure>
// );
// }
// }

export default CodeBlock
