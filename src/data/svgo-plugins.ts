import type { PluginConfig } from 'svgo'

/**
 * A standard plugin config for SVGO. The types for PluginConfig are weird but to make it play
 * nicely with the optimize function we include it and re-add the properties.
 */
export type SvgoPlugin = Extract<PluginConfig, { name: string }> & {
  /**
   * The display name of the plugin used for checkbox labels
   */
  label: string
  /**
   * The help text to display for this plugin to explain generally what it does
   */
  description: string
  /**
   * The default params for this plugin
   */
  params?: Record<string, unknown>
}

export const defaultSvgoPlugins: SvgoPlugin[] = [
  {
    name: 'cleanupAttrs',
    label: 'Cleanup attributes',
    description:
      'Removes redundant whitespaces from attribute values. This will not modify the attribute keys, nor remove them if the value becomes empty after optimization.',
  },
  {
    name: 'cleanupEnableBackground',
    label: 'Cleanup enable-background',
    description: "Removes the /enable-background/ attribute, unless it's used in a filter element",
  },
  {
    name: 'cleanupIds',
    label: 'Cleanup IDs',
    description: 'Removes unused IDs, and minifys IDs that are referenced by other elements.',
  },
  {
    name: 'cleanupNumericValues',
    label: 'Cleanup numeric values',
    description:
      "Rounds numeric values, and removes the unit when it's 'px' as this is the default.",
  },
  {
    name: 'collapseGroups',
    label: 'Collapse groups',
    description:
      'Finds groups that effectively do nothing and flattens them, preserving the contents of the groups.',
  },
  {
    name: 'convertColors',
    label: 'Convert colors',
    description: 'Converts color references to the shortest equivalent.',
  },
  {
    name: 'convertEllipseToCircle',
    label: 'Convert ellipse to circle',
    description: 'Converts ellipses with equal radiuses to circles.',
  },
  {
    name: 'convertPathData',
    label: 'Convert path data',
    description:
      'Optimize path commands found in <path>, <glyph>, and <missing-glyph> elements. Path commands are the syntax used in the d attribute, each character represents an instruction to draw paths.',
  },
  {
    name: 'convertShapeToPath',
    label: 'Convert shape to path',
    description: 'Convert basic shapes to <path> elements.',
  },
  {
    name: 'convertTransform',
    label: 'Convert transform',
    description: 'Collapse multiple transforms into one and convert matrices to the short aliases.',
  },
  {
    name: 'inlineStyles',
    label: 'Inline styles',
    description: 'Merges styles from <style> elements to the style attribute of matching elements.',
  },
  {
    name: 'mergePaths',
    label: 'Merge paths',
    description: 'Merge multiple paths into one.',
  },
  {
    name: 'mergeStyles',
    label: 'Merge styles',
    description: 'Merge multiple style elements into one.',
  },
  {
    name: 'minifyStyles',
    label: 'Minify styles',
    description: 'Minify <style> elements with CSSO',
  },
  {
    name: 'moveElemsAttrsToGroup',
    label: 'Move element attributes to group',
    description: 'Move an elements attributes to their enclosing group.',
  },
  {
    name: 'moveGroupAttrsToElems',
    label: 'Move group attributes to elements',
    description: 'Move some group attributes to the contained elements.',
  },
  {
    name: 'removeComments',
    label: 'Remove comments',
    description:
      "Removes XML comments from the document. XML comments are the content between the '<!--' and '-->' syntax, and do not effect rendering.",
  },
  {
    name: 'removeDesc',
    label: 'Remove description',
    description:
      'Removes the <desc> element from the document if the <desc> element is empty or appears to only contain editor attribution.',
  },
  {
    name: 'removeDoctype',
    label: 'Remove doctype',
    description: 'Removes the Document Type Definition, also known as the DOCTYPE, from the svg.',
  },
  {
    name: 'removeEditorsNSData',
    label: 'Remove editor namespace data',
    description:
      'Removes all XML namespaces, elements, and attributes associated with popular vector editing software.',
  },
  {
    name: 'removeEmptyAttrs',
    label: 'Remove empty attributes',
    description: 'Removes attributes with empty values from elements.',
  },
  {
    name: 'removeEmptyContainers',
    label: 'Remove empty containers',
    description:
      'Remove container elements in the document that have no children or meaningful attributes.',
  },
  {
    name: 'removeEmptyText',
    label: 'Remove empty text',
    description: 'Removes text elements that do not have meaningful attributes.',
  },
  {
    name: 'removeHiddenElems',
    label: 'Remove hidden elements',
    description:
      'Remove hidden or invisible elements from the document. This can be elements with 0 width and height defined, or elements that were just hidden with CSS.',
  },
  {
    name: 'removeMetadata',
    label: 'Remove metadata',
    description:
      "Removes the <metadata> element from the document. Metadata doesn't effect rendering. From an optimization perspective, these can always be safely removed.",
  },
  {
    name: 'removeNonInheritableGroupAttrs',
    label: 'Remove non-inheritable group attributes',
    description: 'Removes non-inheritable presentation groups from children',
  },
  {
    name: 'removeTitle',
    label: 'Remove title',
    description: 'Removes the <title> element from the document.',
  },
  {
    name: 'removeUnknownsAndDefaults',
    label: 'Remove unknowns and defaults',
    description:
      'Removes unknown elements and attributes, as well as attributes that are set to their default value.',
  },
  {
    name: 'removeUnusedNS',
    label: 'Remove unused namespaces',
    description: 'Removes unused namespace declarations from the document.',
  },
  {
    name: 'removeUselessDefs',
    label: 'Remove useless defs',
    description: 'Removes children of <defs> element that do not have an ID to reference.',
  },
  {
    name: 'removeUselessStrokeAndFill',
    label: 'Remove useless stroke and fill',
    description: 'Removes useless stroke and fill attributes.',
  },
  {
    name: 'removeXMLProcInst',
    label: 'Remove XML instructions',
    description: 'Remove XML processing instructions.',
  },
  {
    name: 'sortAttrs',
    label: 'Sort attributes',
    description:
      'Sorts attributes in all elements in the document. This does not reduce the size of the SVG, but improves readability and may improve how compression algorithms perform on it.',
  },
  {
    name: 'sortDefsChildren',
    label: 'Sort defs children',
    description:
      "Sorts all children in the '<defs>' element. This does not reduce the size of the SVG, but may improve how compression algorithms perform on it.",
  },
]

export const additionalSvgoPlugins: SvgoPlugin[] = [
  {
    name: 'removeViewBox',
    label: 'Remove viewBox',
    description: 'Removes the viewBox attribute when height and width is identical.',
  },
  {
    name: 'cleanupListOfValues',
    label: 'Cleanup list of values',
    description:
      'Rounds numeric values in attributes, such as those found in viewBox, enable-background, and points.',
  },
  {
    name: 'convertOneStopGradients',
    label: 'Convert one stop gradients',
    description:
      'Converts the <linearGradient> and <radialGradient> nodes that are effectively a solid color to the color.',
  },
  {
    name: 'convertStyleToAttrs',
    label: 'Convert style to attributes',
    description:
      'Converts presentation attributes in element styles to the equvilent XML attribute.',
  },
  {
    name: 'prefixIds',
    label: 'Prefix IDs and class names',
    description:
      'Prefix element IDs and class names with the provided file name. Defaults to "prefix__"',
  },
  {
    name: 'removeDimensions',
    label: 'Remove dimensions',
    description:
      "Removes the width and height attribute from the top-most <svg> element if specified, and replaces it with the viewBox attribute if it's missing.",
  },
  {
    name: 'removeOffCanvasPaths',
    label: 'Remove off-canvas paths',
    description: 'Removes <path> elements that are drawn outside of a viewBox.',
  },
  {
    name: 'removeRasterImages',
    label: 'Remove raster images',
    description: 'Removes inline JPEGs, PNGs, and GIFs from the document.',
  },
  {
    name: 'removeScriptElement',
    label: 'Remove script element',
    description: 'Removes all scripts from the document.',
  },
  {
    name: 'removeStyleElement',
    label: 'Remove style element',
    description: 'Remove all <style> elements from the document.',
  },
  {
    name: 'removeXMLNS',
    label: 'Remove XMLNS',
    description: 'Removes the xmlns attribute from the top-most <svg> element in the document.',
  },
  {
    name: 'reusePaths',
    label: 'Reuse paths',
    description:
      'Creates a definition for similar paths, and swaps the <path> elements to <use> elements that will reference a single <path> definition.',
  },
]

export const svgoPlugins = [...defaultSvgoPlugins, ...additionalSvgoPlugins]
