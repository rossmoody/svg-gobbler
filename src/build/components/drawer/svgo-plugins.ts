import { Option } from '../../types'

const optionsData: Option[] = [
  {
    title: 'Beautify markup',
    description: 'Format and indent markup',
    pluginName: 'pretty',
  },
  {
    title: 'Cleanup attributes',
    description:
      'Cleanup attributes from new lines, trailing, and repeating spaces',
    pluginName: 'cleanupAttrs',
  },
  {
    title: 'Cleanup enable-background',
    description:
      'Remove or cleanup enable-background attribute when it coincides with width and height',
    pluginName: 'cleanupEnableBackground',
  },
  {
    title: 'Cleanup id attributes',
    description: 'Remove unused and minify used IDs',
    pluginName: 'cleanupIDs',
  },
  {
    title: 'Cleanup numeric values',
    description:
      'Round numeric values to the fixed precision and remove default px units',
    pluginName: 'cleanupNumericValues',
  },
  {
    title: 'Collapse groups',
    description: 'Collapse redundant groups',
    pluginName: 'collapseGroups',
  },
  {
    title: 'Convert colors',
    description: 'Convert colors from rgb() to #rrggbb and #rrggbb to #rgb)',
    pluginName: 'convertColors',
  },
  {
    title: 'Convert ellipsis to circle',
    description: 'Convert non-eccentric <ellipse> to <circle>',
    pluginName: 'convertEllipseToCircle',
  },
  {
    title: 'Convert path data',
    description:
      'Convert and optimize path data to relative or absolute - whichever is shorter',
    pluginName: 'convertPathData',
  },
  {
    title: 'Convert shape to path',
    description: 'Optimize and combine basic shapes to <path>',
    pluginName: 'convertShapeToPath',
  },
  {
    title: 'Convert transform',
    description: 'Collapse multiple transforms into one',
    pluginName: 'convertTransform',
  },
  {
    title: 'Inline styles',
    description:
      'Move and merge styles from <style> elements to element style attributes',
    pluginName: 'inlineStyles',
  },
  {
    title: 'Merge paths',
    description: 'Merge multiple paths into one',
    pluginName: 'mergePaths',
  },
  {
    title: 'Merge styles',
    description: 'Merge multiple style elements into one',
    pluginName: 'mergeStyles',
  },
  {
    title: 'Minify styles',
    description: 'Minify <style> elements with CSSO minifier',
    pluginName: 'minifyStyles',
  },
  {
    title: 'Move element attributes to group',
    description: 'Move element attributes to their enclosing group',
    pluginName: 'moveElemsAttrsToGroup',
  },
  {
    title: 'Move group attributes to elements',
    description: 'Move group attributes to the contained elements',
    pluginName: 'moveGroupAttrsToElems',
  },
  {
    title: 'Prefix id and class',
    description:
      'Prefix IDs and classes with the SVG filename or an arbitrary string',
    pluginName: 'prefixIds',
  },
  {
    title: 'Remove comments',
    description: 'Remove comments inside the markup',
    pluginName: 'removeComments',
  },
  {
    title: 'Remove description',
    description: 'Remove <desc> and content within',
    pluginName: 'removeDesc',
  },
  {
    title: 'Remove dimensions',
    description: "Remove width/height and add viewBox if it's missing",
    pluginName: 'removeDimensions',
  },
  {
    title: 'Remove doctype',
    description: 'Remove doctype declaration',
    pluginName: 'removeDoctype',
  },
  {
    title: 'Remove editor namespace data',
    description: 'Remove editor namespaces, elements, and attributes',
    pluginName: 'removeEditorsNSData',
  },
  {
    title: 'Remove empty attributes',
    description: 'Remove empty attributes',
    pluginName: 'removeEmptyAttrs',
  },
  {
    title: 'Remove empty containers',
    description: 'Remove empty container elements',
    pluginName: 'removeEmptyContainers',
  },
  {
    title: 'Remove empty text',
    description: 'Remove empty text elements',
    pluginName: 'removeEmptyText',
  },
  {
    title: 'Remove hidden elements',
    description: 'Remove hiddent elements with disabled rendering',
    pluginName: 'removeHiddenElems',
  },
  {
    title: 'Remove metadata',
    description: 'Remove <metadata> content within the markup',
    pluginName: 'removeMetadata',
  },
  {
    title: 'Remove non-inheritable attributes',
    description: 'Remove non-inheritable group\'s "presentation" attributes',
    pluginName: 'removeNonInheritableGroupAttrs',
  },
  {
    title: 'Remove raster images',
    description: 'Remove raster images from within the markup',
    pluginName: 'removeRasterImages',
  },
  {
    title: 'Remove title',
    description: 'Remove <title> declaration',
    pluginName: 'removeTitle',
  },
  {
    title: 'Remove unknown elements and defaults',
    description:
      'Remove unknown elements and remove attributes with default values',
    pluginName: 'removeUnknownsAndDefaults',
  },
  {
    title: 'Remove unused namespace',
    description: 'Remove unused namespaces declaration',
    pluginName: 'removeUnusedNS',
  },
  {
    title: 'Remove useless defs',
    description: 'Remove elements inside <defs> without id',
    pluginName: 'removeUselessDefs',
  },
  {
    title: 'Remove useless stroke and fill',
    description: 'Remove useless stroke and fill attributes',
    pluginName: 'removeUselessStrokeAndFill',
  },
  {
    title: 'Remove viewBox attribute',
    description:
      'Remove viewBox attribute when it coincides with width and height attributes',
    pluginName: 'removeViewBox',
  },
  {
    title: 'Remove XML instructions',
    description: 'Remove XML processing instructions',
    pluginName: 'removeXMLProcInst',
  },
  {
    title: 'Remove XMLNS attribute',
    description: 'Remove the xmlns attribute for inline SVG',
    pluginName: 'removeXMLNS',
  },
  {
    title: 'Sort attributes',
    description: 'Sort element attributes alphabetically',
    pluginName: 'sortAttrs',
  },
  {
    title: 'Sort defs children',
    description: 'Sort children of <defs> in order to improve compression',
    pluginName: 'sortDefsChildren',
  },
]

export { optionsData }
