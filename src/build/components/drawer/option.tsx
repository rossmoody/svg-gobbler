import React from 'react'
import {
  Box,
  Flex,
  FormLabel,
  Switch,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { PluginNames, SVGOConfig } from '../../types'

import { svgoConfig } from './process-strings'

interface OptionProps {
  title: string
  description: React.ReactNode
  setConfig: React.Dispatch<React.SetStateAction<SVGOConfig>>
  pluginName: string
  config: SVGOConfig
  setRadioGroup: React.Dispatch<React.SetStateAction<string>>
}

const Option = (props: OptionProps) => {
  const { title, description, pluginName, setConfig, config, setRadioGroup } =
    props

  const pluginState = () => {
    let result: boolean

    if (pluginName === 'pretty') {
      result = config.js2svg.pretty
    } else {
      const currentPlugin = config.plugins.find(
        (plugin) => plugin.name === pluginName
      )

      result = Boolean(currentPlugin?.active)
    }

    return result
  }

  const subduedText = useColorModeValue('gray.500', 'gray.400')

  return (
    <Flex align="center" justify="space-between">
      <FormLabel htmlFor={pluginName}>
        <Box flex="1">
          <Text as="h4" fontWeight="medium" fontSize="md">
            {title}
          </Text>
          <Text color={subduedText} fontSize="sm">
            {description}
          </Text>
        </Box>
      </FormLabel>
      <Switch
        colorScheme="red"
        id={pluginName}
        isChecked={pluginState()}
        onChange={(event) => {
          const eventState = {
            name: event.target.id as PluginNames,
            value: event.target.checked,
          }

          setRadioGroup('custom')

          setConfig((prevConfig) => {
            const config = svgoConfig(prevConfig, eventState)
            return JSON.parse(JSON.stringify(config))
          })
        }}
      />
    </Flex>
  )
}

export { Option }
