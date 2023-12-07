import { nanoid } from 'nanoid'
import { useRevalidator } from 'react-router-dom'
import { SvgoPlugin, defaultSvgoPlugins } from 'src/constants/svgo-plugins'
import { useCollection } from 'src/providers'
import { FormUtils } from 'src/utils/form-utils'
import { StorageUtils } from 'src/utils/storage-utils'
import { SvgUtils } from 'src/utils/svg-utils'
import type { Svg } from 'svg-gobbler-scripts'
import { Inline } from 'svg-gobbler-scripts'
import { Config, optimize } from 'svgo'

export const useContextActions = (data: Svg) => {
  const { state } = useCollection()
  const { revalidate } = useRevalidator()

  const svgoConfig: Config = {
    multipass: true,
    plugins: defaultSvgoPlugins,
  }

  async function duplicateItem() {
    const svgDuplicate = new Inline(data.originalString, nanoid())
    const newData = [svgDuplicate, ...state.data]
    const pageData = await StorageUtils.getPageData(state.collectionId)
    StorageUtils.setPageData(state.collectionId, {
      ...pageData,
      data: SvgUtils.createStorageSvgs(newData),
    })
    revalidate()
  }

  async function deleteItem() {
    const filteredData = state.data.filter((item) => item.id !== data.id)
    const pageData = await StorageUtils.getPageData(state.collectionId)
    StorageUtils.setPageData(state.collectionId, {
      ...pageData,
      data: SvgUtils.createStorageSvgs(filteredData),
    })
    revalidate()
  }

  function copyOriginal() {
    FormUtils.copyStringToClipboard(data.originalString)
  }

  function copySvgoConfig() {
    const result = optimize(data.originalString, svgoConfig)
    FormUtils.copyStringToClipboard(result.data)
  }

  async function copyDefaultConfig() {
    const plugins = (await StorageUtils.getStorageData<SvgoPlugin[]>('plugins')) ?? []
    const result = optimize(data.originalString, { ...svgoConfig, plugins })
    FormUtils.copyStringToClipboard(result.data)
  }

  async function downloadOriginal() {
    const pageData = await StorageUtils.getPageData(state.collectionId)
    FormUtils.downloadSvgString(data.originalString, pageData.host)
  }

  async function downloadSvgoConfig() {
    const pageData = await StorageUtils.getPageData(state.collectionId)
    const result = optimize(data.originalString, svgoConfig)
    FormUtils.downloadSvgString(result.data, pageData.host)
  }

  async function downloadDefaultConfig() {
    const pageData = await StorageUtils.getPageData(state.collectionId)
    const plugins = (await StorageUtils.getStorageData<SvgoPlugin[]>('plugins')) ?? []
    const result = optimize(data.originalString, { ...svgoConfig, plugins })
    FormUtils.downloadSvgString(result.data, pageData.host)
  }

  return {
    duplicateItem,
    deleteItem,
    copyOriginal,
    copySvgoConfig,
    copyDefaultConfig,
    downloadOriginal,
    downloadSvgoConfig,
    downloadDefaultConfig,
  }
}
