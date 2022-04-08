import SVG from '../find/svg-class'

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
  | 'prefixIds'
  | 'removeRasterImages'

/**
 * The SVGO plugin object syntax.
 */
export interface PluginObject {
  name: PluginNames
  active: boolean
}

/**
 * The full SVGO config object.
 */
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

/**
 * The data schema that creates the switch options in the Drawer.
 */
export interface Option {
  title: string
  description: string
  pluginName: PluginNames | 'pretty'
}

/**
 * The data property that gets leveraged from the Chrome message
 */
export type AppData = SVG[][]

/**
 * The object that gets sent from Chrome when extension is pressed
 */
export interface MessageData {
  data: {
    content: SVG[] | 'system' | 'empty' | 'error' | undefined
    location: string
  }
}
