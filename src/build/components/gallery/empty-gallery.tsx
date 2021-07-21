import React from 'react'
import {
  Button,
  Center,
  Box,
  useColorModeValue,
  Text,
  Flex,
  useToken,
} from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa'

import { util } from '../utils/upload'

interface EmptyGallery {
  headline: string
  description: string
}

const EmptyGallery = ({ headline, description }: EmptyGallery) => {
  const backgroundColor = useColorModeValue('gray.100', 'gray.800')
  const lightThemeOutline = useToken('colors', ['gray.400'])
  const darkThemeOutline = useToken('colors', ['gray.500'])
  const outlineColor = useColorModeValue(lightThemeOutline, darkThemeOutline)

  return (
    <Box p="8" bg={backgroundColor}>
      <Center
        maxW="7xl"
        minH="400px"
        mx="auto"
        outline={`2px dashed ${outlineColor}`}
        borderRadius="12px"
      >
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
                maxW="lg"
                mx="auto"
                fontWeight="extrabold"
                fontSize={{ base: '3xl', lg: '4xl' }}
                letterSpacing="tight"
                lineHeight="normal"
              >
                {headline}
              </Text>
              <Text mt="5" mb="6" maxW="sm" mx="auto">
                {description}
              </Text>
              <Button
                variant="solid"
                colorScheme="red"
                leftIcon={<FaPlus />}
                onClick={util.handleUploadClick}
              >
                Upload SVG
              </Button>
            </Box>
          </Flex>
        </Box>
      </Center>
    </Box>
  )
}

export default EmptyGallery
