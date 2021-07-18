import React from 'react'
import { Box, Center, Flex, Text, Stack, StackDivider } from '@chakra-ui/react'

import { SVGHighlighter } from './syntax-highlighter'
import { runSvgo, svgoConfig } from './process-strings'
import { ConfigState } from './plugin-types'
import { Option } from './option'

interface DrawerContent {
  svgString: string
}

function DrawerContent({ svgString }: DrawerContent) {
  const [originalString] = React.useState(svgString)
  const [config, setConfig] = React.useState<ConfigState>({
    updated: true,
    config: svgoConfig(),
  })
  const [string, setString] = React.useState(
    runSvgo(originalString, config.config)
  )

  React.useEffect(() => {
    const newString = runSvgo(originalString, config.config)
    setString(newString)
  }, [config.config, config.updated, originalString])

  return (
    <Flex>
      <Flex
        flex={6}
        flexDir="column"
        maxW="50%"
        minHeight="100vh"
        bg="rgb(40, 42, 54)"
        p={2}
      >
        <Box>Actions for the code will go here</Box>
        <Box minHeight="100%" height="50px" overflow="auto">
          <SVGHighlighter>{string}</SVGHighlighter>
        </Box>
      </Flex>
      <Flex flex={4} flexDir="column">
        <Center minHeight="200px" bg="tomato" marginBottom={2}>
          SVG preview will go here
        </Center>
        <Box position="relative" width="100%" height="100%">
          <Box
            position="absolute"
            top={0}
            right={0}
            bottom={0}
            left={0}
            overflow="auto"
          >
            <Box px={5} paddingTop={4} paddingBottom={6} marginBottom={12}>
              <Box mb="8">
                <Text as="h3" fontWeight="bold" fontSize="lg">
                  Optimize
                </Text>
                <Text color="gray.500" fontSize="sm">
                  Configure the available optimization options from SVGO.
                </Text>
              </Box>
              <Stack spacing="4" divider={<StackDivider />}>
                <Option
                  title="Remove doctype"
                  pluginName="pretty"
                  setConfig={setConfig}
                >
                  Receive email updates on comments you followed
                </Option>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}

export { DrawerContent }
