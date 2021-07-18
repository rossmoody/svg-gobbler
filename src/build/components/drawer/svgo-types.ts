export type PluginNames =
  | 'removeDimensions'
  | 'removeDoctype'
  | 'removeXMLProcInst'
  | 'removeComments'
  | 'removeMetadata'
  | 'removeEditorsNSData'
  | 'cleanupAttrs'
  | 'mergeStyles'
  | 'inlineStyles'
  | 'minifyStyles'
  | 'cleanupIDs'
  | 'removeUselessDefs'
  | 'cleanupNumericValues'
  | 'convertColors'
  | 'removeUnknownsAndDefaults'
  | 'removeNonInheritableGroupAttrs'
  | 'removeUselessStrokeAndFill'
  | 'removeViewBox'
  | 'cleanupEnableBackground'
  | 'removeHiddenElems'
  | 'removeEmptyText'
  | 'convertShapeToPath'
  | 'convertEllipseToCircle'
  | 'moveElemsAttrsToGroup'
  | 'moveGroupAttrsToElems'
  | 'collapseGroups'
  | 'convertPathData'
  | 'convertTransform'
  | 'removeEmptyAttrs'
  | 'removeEmptyContainers'
  | 'mergePaths'
  | 'removeUnusedNS'
  | 'sortDefsChildren'
  | 'removeTitle'
  | 'removeDesc'
  | 'sortAttrs'
  | 'removeXMLNS'
  | 'convertStyletoAttrs'
  | 'prefixIds'
  | 'removeRasterImages'

export interface PluginObject {
  name: PluginNames
  active: boolean
}

export interface SVGOConfig {
  multipass: true
  plugins: PluginObject[]
  js2svg: {
    indent: number
    pretty: boolean
  }
}

export interface PluginEventObject {
  name: PluginNames | 'pretty' | ''
  value: boolean
}

export interface Option {
  title: string
  description: string
  pluginName: PluginNames | 'pretty'
}
