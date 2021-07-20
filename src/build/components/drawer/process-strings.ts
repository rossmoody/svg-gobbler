import { optimize, extendDefaultPlugins } from 'svgo/dist/svgo.browser'

import { PluginObject, PluginEventObject, SVGOConfig } from '../../types'

const pluginsList: PluginObject[] = [
  { name: 'removeDimensions', active: false },
  { name: 'removeDoctype', active: false },
  { name: 'removeXMLProcInst', active: false },
  { name: 'removeComments', active: false },
  { name: 'removeMetadata', active: false },
  { name: 'removeEditorsNSData', active: false },
  { name: 'cleanupAttrs', active: false },
  { name: 'mergeStyles', active: false },
  { name: 'inlineStyles', active: false },
  { name: 'minifyStyles', active: false },
  { name: 'cleanupIDs', active: false },
  { name: 'removeUselessDefs', active: false },
  { name: 'cleanupNumericValues', active: false },
  { name: 'convertColors', active: false },
  { name: 'removeUnknownsAndDefaults', active: false },
  { name: 'removeNonInheritableGroupAttrs', active: false },
  { name: 'removeUselessStrokeAndFill', active: false },
  { name: 'removeViewBox', active: false },
  { name: 'cleanupEnableBackground', active: false },
  { name: 'removeHiddenElems', active: false },
  { name: 'removeEmptyText', active: false },
  { name: 'convertShapeToPath', active: false },
  { name: 'convertEllipseToCircle', active: false },
  { name: 'moveElemsAttrsToGroup', active: false },
  { name: 'moveGroupAttrsToElems', active: false },
  { name: 'collapseGroups', active: false },
  { name: 'convertPathData', active: false },
  { name: 'convertTransform', active: false },
  { name: 'removeEmptyAttrs', active: false },
  { name: 'removeEmptyContainers', active: false },
  { name: 'mergePaths', active: false },
  { name: 'removeUnusedNS', active: false },
  { name: 'sortDefsChildren', active: false },
  { name: 'removeTitle', active: false },
  { name: 'removeDesc', active: false },
  { name: 'sortAttrs', active: false },
]

const falsePlugins: PluginObject[] = extendDefaultPlugins(pluginsList)

const allFalseConfig: SVGOConfig = {
  multipass: true,
  plugins: falsePlugins,
  js2svg: {
    indent: 2,
    pretty: false,
  },
}

const defaultPlugins: PluginObject[] = extendDefaultPlugins([
  {
    name: 'removeViewBox',
    active: false,
  },
])

const defaultConfig: SVGOConfig = {
  multipass: true,
  plugins: defaultPlugins,
  js2svg: {
    indent: 2,
    pretty: true,
  },
}

const defaultPluginState: PluginEventObject = {
  name: '',
  value: false,
}

const svgoConfig = (
  config = defaultConfig,
  pluginState = defaultPluginState
) => {
  const plugin = config.plugins.find(
    (plugin) => plugin.name === pluginState.name
  )
  if (plugin) plugin.active = pluginState.value

  const iAmPretty = pluginState.name === 'pretty'
  if (iAmPretty) config.js2svg.pretty = pluginState.value

  return config
}

function runSvgo(svgString: string, config = svgoConfig()): string {
  const { data } = optimize(svgString, config)
  return data
}

export { runSvgo, svgoConfig, defaultConfig, allFalseConfig }
