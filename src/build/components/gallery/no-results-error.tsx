import React from 'react'
import { Center, Box, useColorModeValue, Text, Flex } from '@chakra-ui/react'

const NoResultsError = () => {
  return (
    <Box p="8" bg={useColorModeValue('gray.100', 'gray.800')}>
      <Center maxW="7xl" minH="400px" mx="auto">
        <Box>
          <Flex
            direction="column"
            align="center"
            justify="center"
            h="full"
            textAlign="center"
            mt="-10"
          >
            <Box>
              <Text
                maxW="md"
                mx="auto"
                fontWeight="extrabold"
                fontSize={{ base: '4xl', lg: '5xl' }}
                letterSpacing="tight"
                lineHeight="normal"
              >
                Shucks, something went wrong
              </Text>
              <Text mt="5" maxW="sm" mx="auto">
                An error occurred when gathering SVGs. Close this page and give
                it another try.
              </Text>
            </Box>
          </Flex>
        </Box>
      </Center>
    </Box>
  )
}

export default NoResultsError
