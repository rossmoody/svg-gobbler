import { optimize, extendDefaultPlugins } from 'svgo/dist/svgo.browser'

const plugins = [
  'cleanupAttrs',
  'cleanupIDs',
  'cleanupNumericValues',
  'cleanupEnableBackground',
  'removeDoctype',
  'removeXMLProcInst',
  'removeComments',
  'removeMetadata',
  'removeEditorsNSData',
  'mergeStyles',
  'inlineStyles',
  'minifyStyles',
  'removeUselessDefs',
  'convertColors',
  'removeUnknownsAndDefaults',
  'removeNonInheritableGroupAttrs',
  'removeUselessStrokeAndFill',
  'removeViewBox',
  'removeHiddenElems',
  'removeEmptyText',
  'convertShapeToPath',
  'convertEllipseToCircle',
  'moveElemsAttrsToGroup',
  'moveGroupAttrsToElems',
  'collapseGroups',
  'convertPathData',
  'convertTransform',
  'removeEmptyAttrs',
  'removeEmptyContainers',
  'mergePaths',
  'removeUnusedNS',
  'sortDefsChildren',
  'removeTitle',
  'removeDesc',
]

const falseConfig = () =>
  plugins.map((pluginName) =>
    Object.create({ name: pluginName, active: false })
  )

const prettyConfig = {
  multipass: true,
  plugins: extendDefaultPlugins(falseConfig()),
  js2svg: {
    indent: 2,
    pretty: true,
  },
}

const defaultConfig = {
  multipass: true,
  plugins: extendDefaultPlugins([
    {
      name: 'removeDimensions',
      active: true,
    },
    {
      name: 'removeViewBox',
      active: false,
    },
    {
      name: 'sortAttrs',
      active: true,
    },
  ]),
  js2svg: {
    indent: 2,
    pretty: true,
  },
}

function prettifySvg(svgString: string): string {
  const { data } = optimize(svgString, prettyConfig)
  return data
}

function optimizeSvg(svgString: string): string {
  const { data } = optimize(svgString, defaultConfig)
  return data
}

export { prettifySvg, optimizeSvg }
