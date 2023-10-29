import { DefaultPlugins } from 'svgo'
import loc from '../../utils/localization'

export type SVGOPlugins = DefaultPlugins & {
  title: string
  description: string
}

const plugins: SVGOPlugins[] = [
  {
    title: loc('svgo_title_cleanAtt'),
    description: loc('svgo_desc_cleanAtt'),
    name: 'cleanupAttrs',
  },
  {
    title: loc('svgo_title_cleanBg'),
    description: loc('svgo_desc_cleanBg'),
    name: 'cleanupEnableBackground',
  },
  {
    title: loc('svgo_title_cleanId'),
    description: loc('svgo_desc_cleanId'),
    name: 'cleanupIDs',
  },
  {
    title: loc('svgo_title_cleanNum'),
    description: loc('svgo_desc_cleanNum'),
    name: 'cleanupNumericValues',
  },
  {
    title: loc('svgo_title_coll'),
    description: loc('svgo_desc_coll'),
    name: 'collapseGroups',
  },
  {
    title: loc('svgo_title_convCol'),
    description: loc('svgo_desc_convCol'),
    name: 'convertColors',
  },
  {
    title: loc('svgo_title_convEllip'),
    description: loc('svgo_desc_convEllip'),
    name: 'convertEllipseToCircle',
  },
  {
    title: loc('svgo_title_convPath'),
    description: loc('svgo_desc_convPath'),
    name: 'convertPathData',
  },
  {
    title: loc('svgo_title_convShape'),
    description: loc('svgo_desc_convShape'),
    name: 'convertShapeToPath',
  },
  {
    title: loc('svgo_title_convTran'),
    description: loc('svgo_desc_convTran'),
    name: 'convertTransform',
  },
  {
    title: loc('svgo_title_inl'),
    description: loc('svgo_desc_inl'),
    name: 'inlineStyles',
  },
  {
    title: loc('svgo_title_mergePath'),
    description: loc('svgo_desc_mergePath'),
    name: 'mergePaths',
  },
  {
    title: loc('svgo_title_mergeStyle'),
    description: loc('svgo_desc_mergeStyle'),
    name: 'mergeStyles',
  },
  {
    title: loc('svgo_title_minStyles'),
    description: loc('svgo_desc_minStyles'),
    name: 'minifyStyles',
  },
  {
    title: loc('svgo_title_moveEl'),
    description: loc('svgo_desc_moveEl'),
    name: 'moveElemsAttrsToGroup',
  },
  {
    title: loc('svgo_title_moveGroup'),
    description: loc('svgo_desc_moveGroup'),
    name: 'moveGroupAttrsToElems',
  },
  {
    title: loc('svgo_title_prefixId'),
    description: loc('svgo_desc_prefixId'),
    name: 'prefixIds',
  },
  {
    title: loc('svgo_title_removeComm'),
    description: loc('svgo_desc_removeComm'),
    name: 'removeComments',
  },
  {
    title: loc('svgo_title_removeDesc'),
    description: loc('svgo_desc_removeDesc'),
    name: 'removeDesc',
  },
  {
    title: loc('svgo_title_removeDim'),
    description: loc('svgo_desc_removeDim'),
    name: 'removeDimensions',
  },
  {
    title: loc('svgo_title_removeDoc'),
    description: loc('svgo_desc_removeDoc'),
    name: 'removeDoctype',
  },
  {
    title: loc('svgo_title_removeEdit'),
    description: loc('svgo_desc_removeEdit'),
    name: 'removeEditorsNSData',
  },
  {
    title: loc('svgo_title_removeEmptyAtt'),
    description: loc('svgo_desc_removeEmptyAtt'),
    name: 'removeEmptyAttrs',
  },
  {
    title: loc('svgo_title_removeCont'),
    description: loc('svgo_desc_removeCont'),
    name: 'removeEmptyContainers',
  },
  {
    title: loc('svgo_title_removeText'),
    description: loc('svgo_desc_removeText'),
    name: 'removeEmptyText',
  },
  {
    title: loc('svgo_title_removeHidden'),
    description: loc('svgo_desc_removeHidden'),
    name: 'removeHiddenElems',
  },
  {
    title: loc('svgo_title_removeMeta'),
    description: loc('svgo_desc_removeMeta'),
    name: 'removeMetadata',
  },
  {
    title: loc('svgo_title_removeNon'),
    description: loc('svgo_desc_removeNon'),
    name: 'removeNonInheritableGroupAttrs',
  },
  {
    title: loc('svgo_title_removeRaster'),
    description: loc('svgo_desc_removeRaster'),
    name: 'removeRasterImages',
  },
  {
    title: loc('svgo_title_removeTitle'),
    description: loc('svgo_desc_removeTitle'),
    name: 'removeTitle',
  },
  {
    title: loc('svgo_title_removeUnk'),
    description: loc('svgo_desc_removeUnk'),
    name: 'removeUnknownsAndDefaults',
  },
  {
    title: loc('svgo_title_removeUnuse'),
    description: loc('svgo_desc_removeUnuse'),
    name: 'removeUnusedNS',
  },
  {
    title: loc('svgo_title_removeUselessDef'),
    description: loc('svgo_desc_removeUselessDef'),
    name: 'removeUselessDefs',
  },
  {
    title: loc('svgo_title_removeUselessStr'),
    description: loc('svgo_desc_removeUselessStr'),
    name: 'removeUselessStrokeAndFill',
  },
  {
    title: loc('svgo_title_removeView'),
    description: loc('svgo_desc_removeView'),
    name: 'removeViewBox',
  },
  {
    title: loc('svgo_title_removeXml'),
    description: loc('svgo_desc_removeXml'),
    name: 'removeXMLProcInst',
  },
  {
    title: loc('svgo_title_removeXmlAtt'),
    description: loc('svgo_desc_removeXmlAtt'),
    name: 'removeXMLNS',
  },
  {
    title: loc('svgo_title_sortAttr'),
    description: loc('svgo_desc_sortAttr'),
    name: 'sortAttrs',
  },
  {
    title: loc('svgo_title_sortDefs'),
    description: loc('svgo_desc_sortDefs'),
    name: 'sortDefsChildren',
  },
]

export default plugins
