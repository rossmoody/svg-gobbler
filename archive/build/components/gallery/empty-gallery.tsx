import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  useColorModeValue,
  useToken,
} from '@chakra-ui/react'
import React from 'react'
import { Plus } from 'react-feather'
import loc from '../utils/localization'
import { util } from '../utils/upload'
import { GalleryFrame } from './gallery-frame'

interface EmptyGallery {
  headline: string
  description: string
}

const EmptyGallery = ({ headline, description }: EmptyGallery) => {
  const lightThemeOutline = useToken('colors', ['gray.400'])
  const darkThemeOutline = useToken('colors', ['gray.500'])
  const outlineColor = useColorModeValue(lightThemeOutline, darkThemeOutline)

  return (
    <GalleryFrame>
      <Center
        id="dropzone"
        maxW="7xl"
        minH="400px"
        mx="auto"
        outline={`2px dashed ${outlineColor}`}
        borderRadius="24px"
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
                leftIcon={<Plus />}
                onClick={util.handleUploadClick}
              >
                {loc('gallery_upload')}
              </Button>
            </Box>
          </Flex>
        </Box>
      </Center>
    </GalleryFrame>
  )
}

export default EmptyGallery
