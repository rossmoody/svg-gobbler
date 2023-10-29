import { Tooltip as ChakraTooltip } from '@chakra-ui/react'
import React from 'react'

type Props = {
  children: React.ReactNode
  label: string
}

const Tooltip = ({ children, label }: Props) => (
  <ChakraTooltip hasArrow borderRadius="md" padding={4} label={label}>
    {children}
  </ChakraTooltip>
)

export default Tooltip
