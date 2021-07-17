import React from 'react'
import { Box, Flex, FormLabel, Switch } from '@chakra-ui/react'

interface OptionProps {
  title: string
  children?: React.ReactNode
}

const Option = (props: OptionProps) => {
  const { title, children } = props

  return (
    <Flex align="center" justify="space-between">
      <FormLabel htmlFor={title}>
        <Box flex="1">
          <Box as="h4" fontWeight="medium">
            {title}
          </Box>
          {children && (
            <Box color="gray.500" fontSize="sm">
              {children}
            </Box>
          )}
        </Box>
      </FormLabel>
      <Switch id={title} />
    </Flex>
  )
}

export { Option }
