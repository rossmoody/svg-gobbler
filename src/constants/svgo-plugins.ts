import type { PluginConfig } from 'svgo'

import { loc } from 'src/utilities/i18n'

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
    description: loc('svgo_cleanupAttrs_desc'),
    label: loc('svgo_cleanupAttrs'),
    name: 'cleanupAttrs',
  },
  {
    description: loc('svgo_cleanupEnableBackground_desc'),
    label: loc('svgo_cleanupEnableBackground'),
    name: 'cleanupEnableBackground',
  },
  {
    description: loc('svgo_cleanupIDs_desc'),
    label: loc('svgo_cleanupIDs'),
    name: 'cleanupIds',
  },
  {
    description: loc('svgo_cleanupNumericValues_desc'),
    label: loc('svgo_cleanupNumericValues'),
    name: 'cleanupNumericValues',
  },
  {
    description: loc('svgo_collapsGroups_desc'),
    label: loc('svgo_collapsGroups'),
    name: 'collapseGroups',
  },
  {
    description: loc('svgo_convertColors_desc'),
    label: loc('svgo_convertColors'),
    name: 'convertColors',
  },
  {
    description: loc('svgo_convertEllipseToCircle_desc'),
    label: loc('svgo_convertEllipseToCircle'),
    name: 'convertEllipseToCircle',
  },
  {
    description: loc('svgo_convertPathData_desc'),
    label: loc('svgo_convertPathData'),
    name: 'convertPathData',
  },
  {
    description: loc('svgo_convertShapeToPath_desc'),
    label: loc('svgo_convertShapeToPath'),
    name: 'convertShapeToPath',
  },
  {
    description: loc('svgo_convertTransform_desc'),
    label: loc('svgo_convertTransform'),
    name: 'convertTransform',
  },
  {
    description: loc('svgo_inlineStyles_desc'),
    label: loc('svgo_inlineStyles'),
    name: 'inlineStyles',
  },
  {
    description: loc('svgo_mergePaths_desc'),
    label: loc('svgo_mergePaths'),
    name: 'mergePaths',
  },
  {
    description: loc('svgo_mergeStyles_desc'),
    label: loc('svgo_mergeStyles'),
    name: 'mergeStyles',
  },
  {
    description: loc('svgo_minifyStyles_desc'),
    label: loc('svgo_minifyStyles'),
    name: 'minifyStyles',
  },
  {
    description: loc('svgo_moveElemsAttrsToGroup_desc'),
    label: loc('svgo_moveElemsAttrsToGroup'),
    name: 'moveElemsAttrsToGroup',
  },
  {
    description: loc('svgo_moveGroupAttrsToElems_desc'),
    label: loc('svgo_moveGroupAttrsToElems'),
    name: 'moveGroupAttrsToElems',
  },
  {
    description: loc('svgo_removeComments_desc'),
    label: loc('svgo_removeComments'),
    name: 'removeComments',
  },
  {
    description: loc('svgo_removeDesc_desc'),
    label: loc('svgo_removeDesc'),
    name: 'removeDesc',
  },
  {
    description: loc('svgo_removeDoctype_desc'),
    label: loc('svgo_removeDoctype'),
    name: 'removeDoctype',
  },
  {
    description: loc('svgo_removeEditorsNSData_desc'),
    label: loc('svgo_removeEditorsNSData'),
    name: 'removeEditorsNSData',
  },
  {
    description: loc('svgo_removeEmptyAttrs_desc'),
    label: loc('svgo_removeEmptyAttrs'),
    name: 'removeEmptyAttrs',
  },
  {
    description: loc('svgo_removeEmptyContainers_desc'),
    label: loc('svgo_removeEmptyContainers'),
    name: 'removeEmptyContainers',
  },
  {
    description: loc('svgo_removeEmptyText_desc'),
    label: loc('svgo_removeEmptyText'),
    name: 'removeEmptyText',
  },
  {
    description: loc('svgo_removeHiddenElems_desc'),
    label: loc('svgo_removeHiddenElems'),
    name: 'removeHiddenElems',
  },
  {
    description: loc('svgo_removeMetadata_desc'),
    label: loc('svgo_removeMetadata'),
    name: 'removeMetadata',
  },
  {
    description: loc('svgo_removeNonInheritableGroupAttrs_desc'),
    label: loc('svgo_removeNonInheritableGroupAttrs'),
    name: 'removeNonInheritableGroupAttrs',
  },
  {
    description: loc('svgo_removeTitle_desc'),
    label: loc('svgo_removeTitle'),
    name: 'removeTitle',
  },
  {
    description: loc('svgo_removeUnknownsAndDefaults_desc'),
    label: loc('svgo_removeUnknownsAndDefaults'),
    name: 'removeUnknownsAndDefaults',
  },
  {
    description: loc('svgo_removeUnusedNS_desc'),
    label: loc('svgo_removeUnusedNS'),
    name: 'removeUnusedNS',
  },
  {
    description: loc('svgo_removeUselessDefs_desc'),
    label: loc('svgo_removeUselessDefs'),
    name: 'removeUselessDefs',
  },
  {
    description: loc('svgo_removeUselessStrokeAndFill_desc'),
    label: loc('svgo_removeUselessStrokeAndFill'),
    name: 'removeUselessStrokeAndFill',
  },
  {
    description: loc('svgo_removeXMLInstructions_desc'),
    label: loc('svgo_removeXMLInstructions'),
    name: 'removeXMLProcInst',
  },
  {
    description: loc('svgo_sortAttrs_desc'),
    label: loc('svgo_sortAttrs'),
    name: 'sortAttrs',
  },
  {
    description: loc('svgo_sortDefsChildren_desc'),
    label: loc('svgo_sortDefsChildren'),
    name: 'sortDefsChildren',
  },
]

export const additionalSvgoPlugins: SvgoPlugin[] = [
  {
    description: loc('svgo_removeViewBox_desc'),
    label: loc('svgo_removeViewBox'),
    name: 'removeViewBox',
  },
  {
    description: loc('svgo_cleanupListOfValues_desc'),
    label: loc('svgo_cleanupListOfValues'),
    name: 'cleanupListOfValues',
  },
  {
    description: loc('svgo_convertOneStopGradients_desc'),
    label: loc('svgo_convertOneStopGradients'),
    name: 'convertOneStopGradients',
  },
  {
    description: loc('svgo_convertStyleToAttrs_desc'),
    label: loc('svgo_convertStyleToAttrs'),
    name: 'convertStyleToAttrs',
  },
  {
    description: loc('svgo_prefixIds_desc'),
    label: loc('svgo_prefixIds'),
    name: 'prefixIds',
  },
  {
    description: loc('svgo_removeDimensions_desc'),
    label: loc('svgo_removeDimensions'),
    name: 'removeDimensions',
  },
  {
    description: loc('svgo_removeOffCanvasPaths_desc'),
    label: loc('svgo_removeOffCanvasPaths'),
    name: 'removeOffCanvasPaths',
  },
  {
    description: loc('svgo_removeRasterImages_desc'),
    label: loc('svgo_removeRasterImages'),
    name: 'removeRasterImages',
  },
  {
    description: loc('svgo_removeScriptElement_desc'),
    label: loc('svgo_removeScriptElement'),
    name: 'removeScriptElement',
  },
  {
    description: loc('svgo_removeStyleElement_desc'),
    label: loc('svgo_removeStyleElement'),
    name: 'removeStyleElement',
  },
  {
    description: loc('svgo_removeXMLNS_desc'),
    label: loc('svgo_removeXMLNS'),
    name: 'removeXMLNS',
  },
  {
    description: loc('svgo_reusePaths_desc'),
    label: loc('svgo_reusePaths'),
    name: 'reusePaths',
  },
]

export const svgoPlugins = [...defaultSvgoPlugins, ...additionalSvgoPlugins]
