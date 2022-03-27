import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Skeleton,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import React from 'react'

const LoadingToolbar = () => {
  return (
    <Box p="8" bg={mode('white', 'gray.800')}>
      <Box maxW="7xl" mx="auto">
        <Stack
          spacing="5"
          direction={{ base: 'column', sm: 'row' }}
          justify="space-between"
        >
          <Stack>
            <Flex alignItems="center">
              <Skeleton>
                <Heading size="lg">Website name</Heading>
              </Skeleton>
            </Flex>
            <Skeleton>
              <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
                Showing available SVGs
              </Text>
            </Skeleton>
          </Stack>
          <HStack
            justify="flex-end"
            flex="1"
            w={{ base: 'full', md: 'auto' }}
            spacing={{ base: '2', md: '4' }}
          >
            <Skeleton>
              <Button size="lg">Download all SVGs</Button>
            </Skeleton>
          </HStack>
        </Stack>
      </Box>
    </Box>
  )
}

export default LoadingToolbar
