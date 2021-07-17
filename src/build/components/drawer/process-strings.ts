import { optimize, extendDefaultPlugins } from 'svgo/dist/svgo.browser'

const plugins = [
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
]

const prettyConfig = {
  multipass: true,
  plugins: extendDefaultPlugins(plugins),
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
