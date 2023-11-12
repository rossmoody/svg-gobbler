import { PluginConfig } from 'svgo'

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
    description: "Removes the `enable-background` attribute, unless it's used in a filter element",
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
      "Rounds numeric values, and removes the unit when it's `px` as this is the default.",
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
      'Optimize path commands found in `<path>`, `<glyph>`, and `<missing-glyph>` elements. Path commands are the syntax used in the `d` attribute, each character represents an instruction to draw paths.',
  },
  // convertShapeToPath: {
  //   convertArcs: true,
  //   floatPrecision: 666,
  // },
  // convertTransform: {
  //   convertToShorts: true,
  //   degPrecision: 666,
  //   floatPrecision: 666,
  //   transformPrecision: 666,
  //   matrixToTransform: true,
  //   shortTranslate: true,
  //   shortScale: true,
  //   shortRotate: true,
  //   removeUseless: true,
  //   collapseIntoOne: true,
  //   leadingZero: true,
  //   negativeExtraSpace: true,
  // },
  // mergeStyles: null,
  // inlineStyles: {
  //   onlyMatchedOnce: true,
  //   removeMatchedSelectors: true,
  //   useMqs: [],
  //   usePseudos: [],
  // },
  // mergePaths: {
  //   force: true,
  //   floatPrecision: 666,
  //   noSpaceAfterFlags: true,
  // },
  {
    name: 'minifyStyles',
    label: 'Minify styles',
    description: 'Minifies CSS styles',
  },
  // moveElemsAttrsToGroup: null,
  // moveGroupAttrsToElems: null,
  // removeComments: {
  //   preservePatterns: [],
  // },
  // removeDesc: {
  //   removeAny: true,
  // },
  {
    name: 'removeDoctype',
    label: 'Remove doctype',
    description: 'Removes the Document Type Definition, also known as the DOCTYPE, from the svg.',
  },
  // removeEditorsNSData: {
  //   additionalNamespaces: [],
  // },
  // removeEmptyAttrs: null,
  // removeEmptyContainers: null,
  // removeEmptyText: {
  //   text: true,
  //   tspan: true,
  //   tref: true,
  // },
  // removeHiddenElems: {
  //   isHidden: true,
  //   displayNone: true,
  //   opacity0: true,
  //   circleR0: true,
  //   ellipseRX0: true,
  //   ellipseRY0: true,
  //   rectWidth0: true,
  //   rectHeight0: true,
  //   patternWidth0: true,
  //   patternHeight0: true,
  //   imageWidth0: true,
  //   imageHeight0: true,
  //   pathEmptyD: true,
  //   polylineEmptyPoints: true,
  //   polygonEmptyPoints: true,
  // },
  // removeMetadata: null,
  // removeNonInheritableGroupAttrs: null,
  // removeTitle: null,
  // removeUnknownsAndDefaults: {
  //   unknownContent: true,
  //   unknownAttrs: true,
  //   defaultAttrs: true,
  //   uselessOverrides: true,
  //   keepDataAttrs: true,
  //   keepAriaAttrs: true,
  //   keepRoleAttr: true,
  // },
  // removeUnusedNS: null,
  // removeUselessDefs: null,
  // removeUselessStrokeAndFill: {
  //   stroke: true,
  //   fill: true,
  //   removeNone: true,
  // },

  {
    name: 'removeXMLProcInst',
    label: 'Remove XML instructions',
    description: 'Remove XML processing instructions',
  },
  // sortAttrs: {
  //   order: [],
  //   xmlnsOrder: 'front', // Assuming 'front' as default
  // },
  // sortDefsChildren: null,
]

export const additionalSvgoPlugins: SvgoPlugin[] = [
  {
    name: 'removeViewBox',
    label: 'Remove viewBox',
    description: 'Removes the viewBox attribute when height/width is identical.',
  },
]

export const svgoPlugins = [...defaultSvgoPlugins, ...additionalSvgoPlugins]
