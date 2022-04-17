import {
  Box,
  Center,
  Divider,
  Flex,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { SVGOConfig } from '../../types'
import loc from '../utils/localization'
import { CodeViewHeader } from './code-view-header'
import { reactify } from './react/reactify'
import { Subhead } from './svgo/form-category-subhead'
import { Option } from './svgo/option'
import { QuickConfiguration } from './svgo/quick-configurations'
import { defaultConfig, runSvgo } from './svgo/svgo-configs'
import { optionsData } from './svgo/svgo-plugins'
import { SVGHighlighter } from './syntax-highlighter'

interface DrawerContent {
  svgString: string
}

/**
 * This component is a nightmare and I have no excuse.
 */
function DrawerContent({ svgString }: DrawerContent) {
  const svgoDefault: SVGOConfig = React.useMemo(
    () => JSON.parse(JSON.stringify(defaultConfig)),
    [],
  )

  const [string, setString] = React.useState(svgString)
  const [config, setConfig] = React.useState<SVGOConfig>(svgoDefault)
  const [radioGroup, setRadioGroup] = React.useState('default')
  const [isReact, setIsReact] = React.useState(false)

  const whiteFillBg = useColorModeValue('gray.100', 'null')

  React.useEffect(() => {
    const newString = runSvgo(svgString, config)

    if (isReact) {
      reactify(newString).then(setString)
    } else {
      setString(newString)
    }
  }, [svgString, config, isReact])

  return (
    <Box display="block" height="100%" width="100%">
      <Flex height="100%">
        <Flex flex={8} flexDir="column" maxW="60%" bg="rgb(40, 42, 54)">
          <CodeViewHeader
            originalString={svgString}
            newString={string}
            isReact={isReact}
            setIsReact={setIsReact}
          />
          <Box minHeight="100%" height="50px" overflow="auto">
            <SVGHighlighter>{string}</SVGHighlighter>
          </Box>
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
                <Subhead>{loc('drawer_quick')}</Subhead>
                <QuickConfiguration
                  setConfig={setConfig}
                  setRadioGroup={setRadioGroup}
                  radioGroup={radioGroup}
                />
                <Divider my={8} />
                <Subhead>{loc('drawer_optim')}</Subhead>
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
