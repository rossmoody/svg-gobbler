import React from 'react'
import { Box, Flex, FormLabel, Switch } from '@chakra-ui/react'

import { svgoConfig } from './process-strings'
import { PluginNames, SVGOConfig } from './svgo-types'

interface OptionProps {
  title: string
  description: React.ReactNode
  setConfig: React.Dispatch<React.SetStateAction<SVGOConfig>>
  pluginName: string
}

const Option = (props: OptionProps) => {
  const { title, description, pluginName, setConfig } = props

  return (
    <Flex align="center" justify="space-between">
      <FormLabel htmlFor={pluginName}>
        <Box flex="1">
          <Box as="h4" fontWeight="medium" fontSize="md">
            {title}
          </Box>
          <Box color="gray.500" fontSize="sm">
            {description}
          </Box>
        </Box>
      </FormLabel>
      <Switch
        colorScheme="red"
        id={pluginName}
        onChange={(event) => {
          const eventState = {
            name: event.target.id as PluginNames,
            value: event.target.checked,
          }

          setConfig((prevConfig) => {
            const newConfig = { ...prevConfig }
            const config = svgoConfig(newConfig, eventState)
            return config
          })
        }}
      />
    </Flex>
  )
}

export { Option }
