import type { PluginConfig } from 'svgo'

/**
 * A standard plugin config for SVGO. The types for PluginConfig are weird but to make it play
 * nicely with the optimize function we include it and re-add the properties.
 */
export type SvgoPlugin = Extract<PluginConfig, { name: string }> & {
  /**
   * The help text to display for this plugin to explain generally what it does
   */
  description: string
  /**
   * The display name of the plugin used for checkbox labels
   */
  label: string
  /**
   * The default params for this plugin
   */
  params?: Record<string, unknown>
}

export const defaultSvgoPlugins: SvgoPlugin[] = [
  {
    description:
      'Removes redundant whitespaces from attribute values. This will not modify the attribute keys, nor remove them if the value becomes empty after optimization.',
    label: 'Cleanup attributes',
    name: 'cleanupAttrs',
  },
  {
    description: "Removes the /enable-background/ attribute, unless it's used in a filter element",
    label: 'Cleanup enable-background',
    name: 'cleanupEnableBackground',
  },
  {
    description: 'Removes unused IDs, and minifys IDs that are referenced by other elements.',
    label: 'Cleanup IDs',
    name: 'cleanupIds',
  },
  {
    description:
      "Rounds numeric values, and removes the unit when it's 'px' as this is the default.",
    label: 'Cleanup numeric values',
    name: 'cleanupNumericValues',
  },
  {
    description:
      'Finds groups that effectively do nothing and flattens them, preserving the contents of the groups.',
    label: 'Collapse groups',
    name: 'collapseGroups',
  },
  {
    description: 'Converts color references to the shortest equivalent.',
    label: 'Convert colors',
    name: 'convertColors',
  },
  {
    description: 'Converts ellipses with equal radiuses to circles.',
    label: 'Convert ellipse to circle',
    name: 'convertEllipseToCircle',
  },
  {
    description:
      'Optimize path commands found in <path>, <glyph>, and <missing-glyph> elements. Path commands are the syntax used in the d attribute, each character represents an instruction to draw paths.',
    label: 'Convert path data',
    name: 'convertPathData',
  },
  {
    description: 'Convert basic shapes to <path> elements.',
    label: 'Convert shape to path',
    name: 'convertShapeToPath',
  },
  {
    description: 'Collapse multiple transforms into one and convert matrices to the short aliases.',
    label: 'Convert transform',
    name: 'convertTransform',
  },
  {
    description: 'Merges styles from <style> elements to the style attribute of matching elements.',
    label: 'Inline styles',
    name: 'inlineStyles',
  },
  {
    description: 'Merge multiple paths into one.',
    label: 'Merge paths',
    name: 'mergePaths',
  },
  {
    description: 'Merge multiple style elements into one.',
    label: 'Merge styles',
    name: 'mergeStyles',
  },
  {
    description: 'Minify <style> elements with CSSO',
    label: 'Minify styles',
    name: 'minifyStyles',
  },
  {
    description: 'Move an elements attributes to their enclosing group.',
    label: 'Move element attributes to group',
    name: 'moveElemsAttrsToGroup',
  },
  {
    description: 'Move some group attributes to the contained elements.',
    label: 'Move group attributes to elements',
    name: 'moveGroupAttrsToElems',
  },
  {
    description:
      "Removes XML comments from the document. XML comments are the content between the '<!--' and '-->' syntax, and do not effect rendering.",
    label: 'Remove comments',
    name: 'removeComments',
  },
  {
    description:
      'Removes the <desc> element from the document if the <desc> element is empty or appears to only contain editor attribution.',
    label: 'Remove description',
    name: 'removeDesc',
  },
  {
    description: 'Removes the Document Type Definition, also known as the DOCTYPE, from the svg.',
    label: 'Remove doctype',
    name: 'removeDoctype',
  },
  {
    description:
      'Removes all XML namespaces, elements, and attributes associated with popular vector editing software.',
    label: 'Remove editor namespace data',
    name: 'removeEditorsNSData',
  },
  {
    description: 'Removes attributes with empty values from elements.',
    label: 'Remove empty attributes',
    name: 'removeEmptyAttrs',
  },
  {
    description:
      'Remove container elements in the document that have no children or meaningful attributes.',
    label: 'Remove empty containers',
    name: 'removeEmptyContainers',
  },
  {
    description: 'Removes text elements that do not have meaningful attributes.',
    label: 'Remove empty text',
    name: 'removeEmptyText',
  },
  {
    description:
      'Remove hidden or invisible elements from the document. This can be elements with 0 width and height defined, or elements that were just hidden with CSS.',
    label: 'Remove hidden elements',
    name: 'removeHiddenElems',
  },
  {
    description:
      "Removes the <metadata> element from the document. Metadata doesn't effect rendering. From an optimization perspective, these can always be safely removed.",
    label: 'Remove metadata',
    name: 'removeMetadata',
  },
  {
    description: 'Removes non-inheritable presentation groups from children',
    label: 'Remove non-inheritable group attributes',
    name: 'removeNonInheritableGroupAttrs',
  },
  {
    description: 'Removes the <title> element from the document.',
    label: 'Remove title',
    name: 'removeTitle',
  },
  {
    description:
      'Removes unknown elements and attributes, as well as attributes that are set to their default value.',
    label: 'Remove unknowns and defaults',
    name: 'removeUnknownsAndDefaults',
  },
  {
    description: 'Removes unused namespace declarations from the document.',
    label: 'Remove unused namespaces',
    name: 'removeUnusedNS',
  },
  {
    description: 'Removes children of <defs> element that do not have an ID to reference.',
    label: 'Remove useless defs',
    name: 'removeUselessDefs',
  },
  {
    description: 'Removes useless stroke and fill attributes.',
    label: 'Remove useless stroke and fill',
    name: 'removeUselessStrokeAndFill',
  },
  {
    description: 'Remove XML processing instructions.',
    label: 'Remove XML instructions',
    name: 'removeXMLProcInst',
  },
  {
    description:
      'Sorts attributes in all elements in the document. This does not reduce the size of the SVG, but improves readability and may improve how compression algorithms perform on it.',
    label: 'Sort attributes',
    name: 'sortAttrs',
  },
  {
    description:
      "Sorts all children in the '<defs>' element. This does not reduce the size of the SVG, but may improve how compression algorithms perform on it.",
    label: 'Sort defs children',
    name: 'sortDefsChildren',
  },
]

export const additionalSvgoPlugins: SvgoPlugin[] = [
  {
    description: 'Removes the viewBox attribute when height and width is identical.',
    label: 'Remove viewBox',
    name: 'removeViewBox',
  },
  {
    description:
      'Rounds numeric values in attributes, such as those found in viewBox, enable-background, and points.',
    label: 'Cleanup list of values',
    name: 'cleanupListOfValues',
  },
  {
    description:
      'Converts the <linearGradient> and <radialGradient> nodes that are effectively a solid color to the color.',
    label: 'Convert one stop gradients',
    name: 'convertOneStopGradients',
  },
  {
    description:
      'Converts presentation attributes in element styles to the equvilent XML attribute.',
    label: 'Convert style to attributes',
    name: 'convertStyleToAttrs',
  },
  {
    description:
      'Prefix element IDs and class names with the provided file name. Defaults to "prefix__"',
    label: 'Prefix IDs and class names',
    name: 'prefixIds',
  },
  {
    description:
      "Removes the width and height attribute from the top-most <svg> element if specified, and replaces it with the viewBox attribute if it's missing.",
    label: 'Remove dimensions',
    name: 'removeDimensions',
  },
  {
    description: 'Removes <path> elements that are drawn outside of a viewBox.',
    label: 'Remove off-canvas paths',
    name: 'removeOffCanvasPaths',
  },
  {
    description: 'Removes inline JPEGs, PNGs, and GIFs from the document.',
    label: 'Remove raster images',
    name: 'removeRasterImages',
  },
  {
    description: 'Removes all scripts from the document.',
    label: 'Remove script element',
    name: 'removeScriptElement',
  },
  {
    description: 'Remove all <style> elements from the document.',
    label: 'Remove style element',
    name: 'removeStyleElement',
  },
  {
    description: 'Removes the xmlns attribute from the top-most <svg> element in the document.',
    label: 'Remove XMLNS',
    name: 'removeXMLNS',
  },
  {
    description:
      'Creates a definition for similar paths, and swaps the <path> elements to <use> elements that will reference a single <path> definition.',
    label: 'Reuse paths',
    name: 'reusePaths',
  },
]

export const svgoPlugins = [...defaultSvgoPlugins, ...additionalSvgoPlugins]
