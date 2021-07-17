import React from 'react'
import { StackDivider, Stack, Box, Text } from '@chakra-ui/react'

import { Option } from './option'

function SVGOSwitches() {
  return (
    <Box
      position="absolute"
      top={0}
      right={0}
      bottom={0}
      left={0}
      px={5}
      paddingTop={4}
      paddingBottom={6}
    >
      <Box mb="8">
        <Text as="h3" fontWeight="bold" fontSize="lg">
          Notifications
        </Text>
        <Text color="gray.500" fontSize="sm">
          Receive notifications about Chakra UI updates.
        </Text>
      </Box>
      <Stack spacing="4" divider={<StackDivider />}>
        <Option title="Email">
          Receive email updates on comments you followed
        </Option>
        <Option title="Text messages">Receive updates by SMS</Option>
        <Option title="Browser notifications">
          We&apos;ll send via our desktop or mobile app
        </Option>
        <Option title="Browser notifications">
          We&apos;ll send via our desktop or mobile app
        </Option>
        <Option title="Browser notifications">
          We&apos;ll send via our desktop or mobile app
        </Option>
        <Option title="Browser notifications">
          We&apos;ll send via our desktop or mobile app
        </Option>
        <Option title="Browser notifications">
          We&apos;ll send via our desktop or mobile app
        </Option>
      </Stack>
    </Box>
  )
}

export { SVGOSwitches }
