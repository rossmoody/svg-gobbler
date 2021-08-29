import { Option } from '../../../types'
import loc from '../../utils/localization'

const optionsData: Option[] = [
  {
    title: loc('svgo_title_beaut'),
    description: loc('svgo_desc_beaut'),
    pluginName: 'pretty',
  },
  {
    title: loc('svgo_title_cleanAtt'),
    description: loc('svgo_desc_cleanAtt'),
    pluginName: 'cleanupAttrs',
  },
  {
    title: loc('svgo_title_cleanBg'),
    description: loc('svgo_desc_cleanBg'),
    pluginName: 'cleanupEnableBackground',
  },
  {
    title: loc('svgo_title_cleanId'),
    description: loc('svgo_desc_cleanId'),
    pluginName: 'cleanupIDs',
  },
  {
    title: loc('svgo_title_cleanNum'),
    description: loc('svgo_desc_cleanNum'),
    pluginName: 'cleanupNumericValues',
  },
  {
    title: loc('svgo_title_coll'),
    description: loc('svgo_desc_coll'),
    pluginName: 'collapseGroups',
  },
  {
    title: loc('svgo_title_convCol'),
    description: loc('svgo_desc_convCol'),
    pluginName: 'convertColors',
  },
  {
    title: loc('svgo_title_convEllip'),
    description: loc('svgo_desc_convEllip'),
    pluginName: 'convertEllipseToCircle',
  },
  {
    title: loc('svgo_title_convPath'),
    description: loc('svgo_desc_convPath'),
    pluginName: 'convertPathData',
  },
  {
    title: loc('svgo_title_convShape'),
    description: loc('svgo_desc_convShape'),
    pluginName: 'convertShapeToPath',
  },
  {
    title: loc('svgo_title_convTran'),
    description: loc('svgo_desc_convTran'),
    pluginName: 'convertTransform',
  },
  {
    title: loc('svgo_title_inl'),
    description: loc('svgo_desc_inl'),
    pluginName: 'inlineStyles',
  },
  {
    title: loc('svgo_title_mergePath'),
    description: loc('svgo_desc_mergePath'),
    pluginName: 'mergePaths',
  },
  {
    title: loc('svgo_title_mergeStyle'),
    description: loc('svgo_desc_mergeStyle'),
    pluginName: 'mergeStyles',
  },
  {
    title: loc('svgo_title_minStyles'),
    description: loc('svgo_desc_minStyles'),
    pluginName: 'minifyStyles',
  },
  {
    title: loc('svgo_title_moveEl'),
    description: loc('svgo_desc_moveEl'),
    pluginName: 'moveElemsAttrsToGroup',
  },
  {
    title: loc('svgo_title_moveGroup'),
    description: loc('svgo_desc_moveGroup'),
    pluginName: 'moveGroupAttrsToElems',
  },
  {
    title: loc('svgo_title_prefixId'),
    description: loc('svgo_desc_prefixId'),
    pluginName: 'prefixIds',
  },
  {
    title: loc('svgo_title_removeComm'),
    description: loc('svgo_desc_removeComm'),
    pluginName: 'removeComments',
  },
  {
    title: loc('svgo_title_removeDesc'),
    description: loc('svgo_desc_removeDesc'),
    pluginName: 'removeDesc',
  },
  {
    title: loc('svgo_title_removeDim'),
    description: loc('svgo_desc_removeDim'),
    pluginName: 'removeDimensions',
  },
  {
    title: loc('svgo_title_removeDoc'),
    description: loc('svgo_desc_removeDoc'),
    pluginName: 'removeDoctype',
  },
  {
    title: loc('svgo_title_removeEdit'),
    description: loc('svgo_desc_removeEdit'),
    pluginName: 'removeEditorsNSData',
  },
  {
    title: loc('svgo_title_removeEmptyAtt'),
    description: loc('svgo_desc_removeEmptyAtt'),
    pluginName: 'removeEmptyAttrs',
  },
  {
    title: loc('svgo_title_removeCont'),
    description: loc('svgo_desc_removeCont'),
    pluginName: 'removeEmptyContainers',
  },
  {
    title: loc('svgo_title_removeText'),
    description: loc('svgo_desc_removeText'),
    pluginName: 'removeEmptyText',
  },
  {
    title: loc('svgo_title_removeHidden'),
    description: loc('svgo_desc_removeHidden'),
    pluginName: 'removeHiddenElems',
  },
  {
    title: loc('svgo_title_removeMeta'),
    description: loc('svgo_desc_removeMeta'),
    pluginName: 'removeMetadata',
  },
  {
    title: loc('svgo_title_removeNon'),
    description: loc('svgo_desc_removeNon'),
    pluginName: 'removeNonInheritableGroupAttrs',
  },
  {
    title: loc('svgo_title_removeRaster'),
    description: loc('svgo_desc_removeRaster'),
    pluginName: 'removeRasterImages',
  },
  {
    title: loc('svgo_title_removeTitle'),
    description: loc('svgo_desc_removeTitle'),
    pluginName: 'removeTitle',
  },
  {
    title: loc('svgo_title_removeUnk'),
    description: loc('svgo_desc_removeUnk'),
    pluginName: 'removeUnknownsAndDefaults',
  },
  {
    title: loc('svgo_title_removeUnuse'),
    description: loc('svgo_desc_removeUnuse'),
    pluginName: 'removeUnusedNS',
  },
  {
    title: loc('svgo_title_removeUselessDef'),
    description: loc('svgo_desc_removeUselessDef'),
    pluginName: 'removeUselessDefs',
  },
  {
    title: loc('svgo_title_removeUselessStr'),
    description: loc('svgo_desc_removeUselessStr'),
    pluginName: 'removeUselessStrokeAndFill',
  },
  {
    title: loc('svgo_title_removeView'),
    description: loc('svgo_desc_removeView'),
    pluginName: 'removeViewBox',
  },
  {
    title: loc('svgo_title_removeXml'),
    description: loc('svgo_desc_removeXml'),
    pluginName: 'removeXMLProcInst',
  },
  {
    title: loc('svgo_title_removeXmlAtt'),
    description: loc('svgo_desc_removeXmlAtt'),
    pluginName: 'removeXMLNS',
  },
  {
    title: loc('svgo_title_sortAttr'),
    description: loc('svgo_desc_sortAttr'),
    pluginName: 'sortAttrs',
  },
  {
    title: loc('svgo_title_sortDefs'),
    description: loc('svgo_desc_sortDefs'),
    pluginName: 'sortDefsChildren',
  },
]

export { optionsData }
