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
      customStyle={{
        margin: 0,
        borderRadius: 0,
        padding: '24px 32px',
        paddingBottom: '120px',
      }}
    >
      {children}
    </SyntaxHighlighter>
  )
}

export { SVGHighlighter }
