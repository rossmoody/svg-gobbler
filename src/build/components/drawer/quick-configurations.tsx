import React from 'react'
import { RadioGroup, Radio, Stack } from '@chakra-ui/react'

import { SVGOConfig } from '../../types'

import { defaultConfig, allFalseConfig } from './svgo-configs'

interface QuickConfigurationProps {
  setConfig: React.Dispatch<React.SetStateAction<SVGOConfig>>
  setRadioGroup: React.Dispatch<React.SetStateAction<string>>
  radioGroup: string
}

export function QuickConfiguration({
  setConfig,
  setRadioGroup,
  radioGroup,
}: QuickConfigurationProps) {
  return (
    <RadioGroup
      onChange={(value) => {
        switch (value) {
          case 'default': {
            setRadioGroup('default')
            setConfig(JSON.parse(JSON.stringify(defaultConfig)))
            break
          }

          case 'none': {
            setRadioGroup('none')
            setConfig(JSON.parse(JSON.stringify(allFalseConfig)))
            break
          }

          default: {
            setRadioGroup('custom')
            break
          }
        }
      }}
      value={radioGroup}
      colorScheme="red"
    >
      <Stack direction="row" spacing={4}>
        <Radio value="none">None</Radio>
        <Radio value="default">SVGO Default</Radio>
        <Radio value="custom">Custom</Radio>
      </Stack>
    </RadioGroup>
  )
}
