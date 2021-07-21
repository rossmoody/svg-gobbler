import React from 'react'
import { Box, Center, Flex, Stack, Divider } from '@chakra-ui/react'

import { SVGOConfig } from '../../types'

import { SVGHighlighter } from './syntax-highlighter'
import { runSvgo, defaultConfig } from './process-strings'
import { Option } from './option'
import { optionsData } from './options-data'
import { CodeViewHeader } from './code-view-header'
import { Subhead } from './form-category-subhead'
import { QuickConfiguration } from './quick-configurations'

interface DrawerContent {
  svgString: string
}

function DrawerContent({ svgString }: DrawerContent) {
  const svgoDefault: SVGOConfig = React.useMemo(
    () => JSON.parse(JSON.stringify(defaultConfig)),
    []
  )

  const [originalString] = React.useState(svgString)
  const [string, setString] = React.useState(svgString)
  const [config, setConfig] = React.useState<SVGOConfig>(svgoDefault)
  const [radioGroup, setRadioGroup] = React.useState('default')

  React.useEffect(() => {
    const newString = runSvgo(originalString, config)
    setString(newString)
  }, [originalString, config])

  return (
    <Box display="block" height="100%" width="100%">
      <Flex height="100%">
        <Flex flex={8} flexDir="column" maxW="65%" bg="rgb(40, 42, 54)">
          <CodeViewHeader originalString={originalString} newString={string} />
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
                <Subhead>Quick Configuration</Subhead>
                <QuickConfiguration
                  setConfig={setConfig}
                  setRadioGroup={setRadioGroup}
                  radioGroup={radioGroup}
                />
                <Divider my={8} />
                <Subhead>Optimizations</Subhead>
                <Stack spacing="4">
                  {optionsData.map((option) => (
                    <Option
                      key={option.pluginName}
                      title={option.title}
                      pluginName={option.pluginName}
                      description={option.description}
                      setConfig={setConfig}
                      config={config}
                      setRadioGroup={setRadioGroup}
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
