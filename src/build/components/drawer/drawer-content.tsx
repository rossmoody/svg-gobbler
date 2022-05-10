import {
  Box,
  Center,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useOptions } from 'src/build/providers/options-provider'
import { optimize } from 'svgo/dist/svgo.browser'
import loc from '../utils/localization'
import { CodeViewHeader } from './code-view-header'
import PluginOption from './plugin-option'
import { reactify } from './svgo/reactify'
import plugins from './svgo/svgo-plugins'
import { SVGHighlighter } from './syntax-highlighter'

interface DrawerContent {
  svgString: string
}

function DrawerContent({ svgString }: DrawerContent) {
  const [svg, setSvg] = useState(svgString)
  const { options } = useOptions()
  const whiteFillBg = useColorModeValue('gray.100', 'null')

  React.useEffect(() => {
    console.log('', 'before the optimize function')
    const { data } = optimize(svgString, options.config)

    if (options.react) {
      reactify(data).then(setSvg)
    }

    setSvg(data)
    console.log('', 'after set SVG')
  }, [options.react, options.config.plugins?.length])

  return (
    <Box display="block" height="100%" width="100%">
      <Flex height="100%">
        <Flex flex={8} flexDir="column" maxW="60%" bg="rgb(40, 42, 54)">
          <CodeViewHeader svgString={svgString} newSvgString={svg} />
          <SVGHighlighter code={svg} />
        </Flex>
        <Flex flex={4} flexDir="column">
          <Center
            minHeight="140px"
            maxHeight="140px"
            p={4}
            dangerouslySetInnerHTML={{ __html: svgString }}
            overflow="hidden"
            bg={whiteFillBg}
            sx={{
              '& > svg': {
                height: '80%',
                width: '80%',
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
                <Box mb="4">
                  <Text
                    as="h3"
                    fontWeight="bold"
                    fontSize="xs"
                    color="gray.400"
                    textTransform="uppercase"
                  >
                    {loc('drawer_optim')}
                  </Text>
                </Box>
                <Stack spacing="4">
                  {plugins.map((plugin) => (
                    <PluginOption key={plugin.name} name={plugin.name} />
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
