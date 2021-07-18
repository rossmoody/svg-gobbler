import React from 'react'
import {
  Button,
  Box,
  Center,
  Flex,
  Text,
  Stack,
  StackDivider,
} from '@chakra-ui/react'
import prettyBytes from 'pretty-bytes'

import { SVGHighlighter } from './syntax-highlighter'
import { runSvgo, defaultConfig } from './process-strings'
import { SVGOConfig } from './svgo-types'
import { Option } from './option'
import { optionsData } from './options-data'

const stringSize = (string: string) => {
  const bytes = new Blob([string]).size
  return prettyBytes(bytes)
}

interface DrawerContent {
  svgString: string
}

function DrawerContent({ svgString }: DrawerContent) {
  const initialConfig: SVGOConfig = React.useMemo(
    () => JSON.parse(JSON.stringify(defaultConfig)),
    []
  )
  const [originalString] = React.useState(svgString)
  const [string, setString] = React.useState(svgString)
  const [config, setConfig] = React.useState<SVGOConfig>(initialConfig)

  React.useEffect(() => {
    const newString = runSvgo(originalString, config)
    setString(newString)
  }, [originalString, config])

  return (
    <Box display="block" height="100%" width="100%">
      <Flex height="100%">
        <Flex flex={6} flexDir="column" maxW="50%" bg="rgb(40, 42, 54)" p={2}>
          <Flex justifyContent="space-between" p={3} alignItems="center">
            <Box w="32px" />
            <Text color="gray.400" size="11px">
              {stringSize(string)}
            </Text>
            <Button size="xs">Copy</Button>
          </Flex>
          <Box minHeight="100%" height="50px" overflow="auto">
            <SVGHighlighter>{string}</SVGHighlighter>
          </Box>
        </Flex>
        <Flex flex={4} flexDir="column">
          <Center
            minHeight="140px"
            maxHeight="140px"
            p={4}
            dangerouslySetInnerHTML={{ __html: string }}
            overflow="hidden"
            sx={{
              '& > svg': {
                height: '90%',
                width: '90%',
                overflow: 'visible',
              },
            }}
          />
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
                  {optionsData.map((option) => (
                    <Option
                      key={option.pluginName}
                      title={option.title}
                      pluginName={option.pluginName}
                      description={option.description}
                      setConfig={setConfig}
                    />
                  ))}
                </Stack>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export { DrawerContent }
