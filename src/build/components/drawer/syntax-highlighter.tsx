import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

const SVGHighlighter: React.FC = ({ children }) => {
  return (
    <SyntaxHighlighter
      wrapLines
      wrapLongLines
      style={dracula}
      language="markup"
      customStyle
    >
      {children}
    </SyntaxHighlighter>
  )
}

export { SVGHighlighter }
