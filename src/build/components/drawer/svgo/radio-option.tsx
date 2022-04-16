import { Radio } from '@chakra-ui/react'
import React from 'react'

interface Props {
  label: string
  value: string
}

export const RadioOption = ({ label, value }: Props) => (
  <Radio _hover={{ cursor: 'pointer' }} value={value} id={label}>
    {label}
  </Radio>
)
