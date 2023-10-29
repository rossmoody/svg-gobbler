import { Box } from '@chakra-ui/react'
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

type Props = {
  code: string
}

const SVGHighlighter = ({ code }: Props) => (
  <Box minHeight="100%" height="50px" overflow="auto">
    <SyntaxHighlighter
      wrapLines
      wrapLongLines
      style={dracula}
      language="jsx"
      customStyle={{
        margin: 0,
        borderRadius: 0,
        padding: '24px 32px',
        paddingBottom: '120px',
        minHeight: '100%',
      }}
    >
      {code}
    </SyntaxHighlighter>
  </Box>
)

export { SVGHighlighter }
