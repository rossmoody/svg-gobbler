import React from 'react'
import { Radio } from '@chakra-ui/react'

interface RadioOption {
  label: string
  value: string
}

export const RadioOption = ({ label, value }: RadioOption) => (
  <Radio _hover={{ cursor: 'pointer' }} value={value} id={label}>
    {label}
  </Radio>
)
