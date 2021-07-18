import React from 'react'
import { Box, Flex, FormLabel, Switch } from '@chakra-ui/react'

import { svgoConfig } from './process-strings'
import { ConfigState } from './plugin-types'

interface OptionProps {
  title: string
  children?: React.ReactNode
  setConfig: React.Dispatch<React.SetStateAction<ConfigState>>
  pluginName: string
}

const Option = (props: OptionProps) => {
  const { title, children, pluginName, setConfig } = props

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
      <Switch
        colorScheme="red"
        id={pluginName}
        onChange={(event) => {
          const eventState = {
            name: event.target.id,
            value: event.target.checked,
          }

          setConfig((prevConfig: any) => {
            const updated = !prevConfig.updated
            const config = svgoConfig(prevConfig.config, eventState)

            return {
              updated,
              config,
            }
          })
        }}
      />
    </Flex>
  )
}

export { Option }
