import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'
import { OptimizeOptions } from 'svgo'

type Options = {
  react: boolean
  config: OptimizeOptions
}

interface OptionsContextProps {
  options: Options
  setOptions: Dispatch<SetStateAction<Options>>
}

const OptionsContext = createContext({} as OptionsContextProps)

export const OptionsProvider: React.FC = ({ children }) => {
  const [options, setOptions] = useState<Options>({
    react: false,
    config: {
      multipass: true,
      plugins: [
        'cleanupIDs',
        'cleanupListOfValues',
        'cleanupListOfValues',
        'cleanupNumericValues',
        'cleanupAttrs',
        'mergeStyles',
        'inlineStyles',
        'removeDoctype',
        'removeXMLNS',
        'removeXMLProcInst',
        'removeComments',
        'removeDesc',
        'removeUselessDefs',
        'removeUselessStrokeAndFill',
        'removeEmptyAttrs',
        'removeHiddenElems',
        'removeEmptyContainers',
        'sortAttrs',
        'sortDefsChildren',
      ],
      js2svg: {
        indent: 2,
        pretty: true,
      },
    },
  })

  const memo = useMemo(
    () => ({
      options,
      setOptions,
    }),
    [options],
  )

  return (
    <OptionsContext.Provider value={memo}>{children}</OptionsContext.Provider>
  )
}

export const useOptions = () => useContext(OptionsContext)
