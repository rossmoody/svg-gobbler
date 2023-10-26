import { Flex, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'src/build/providers/location-provider'
import type { AppData } from 'src/build/types'
import loc from '../utils/localization'
import { util } from '../utils/upload'

type Props = {
  data: AppData
}

export const Location = ({ data }: Props) => {
  const { location } = useLocation()

  return (
    <Stack>
      <Flex alignItems="center">
        <Heading size="lg">{location}</Heading>
      </Flex>
      <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm">
        {util.getSvgQuantity(data)} {loc('toolbar_qty')}
        {util.isPlural(util.getSvgQuantity(data))}
      </Text>
    </Stack>
  )
}
