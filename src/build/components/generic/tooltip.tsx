import React from 'react'
import { Tooltip as ChakraTooltip } from '@chakra-ui/react'

interface Tooltip {
  children: React.ReactNode
  label: string
}

const Tooltip = ({ children, label }: Tooltip) => (
  <ChakraTooltip hasArrow borderRadius="md" padding={4} label={label}>
    {children}
  </ChakraTooltip>
)

export default Tooltip
