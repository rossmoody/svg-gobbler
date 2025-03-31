import type { StorageSvg, Svg } from 'src/scripts'

import { nanoid } from 'nanoid'
import { useRevalidator } from 'react-router-dom'
import { useCollection } from 'src/providers'
import { Inline } from 'src/scripts'
import { FormUtils } from 'src/utils/form-utils'
import { StorageUtils } from 'src/utils/storage-utils'
import { SvgUtils } from 'src/utils/svg-utils'
import { optimize } from 'svgo'

export const useCardActions = (data: Svg) => {
  const { state } = useCollection()
  const { revalidate } = useRevalidator()

  async function duplicateItem() {
    const storageSvgDuplicate: StorageSvg = {
      corsRestricted: data.corsRestricted,
      id: nanoid(),
      lastEdited: new Date().toISOString(),
      name: data.name,
      svg: data.svg,
    }
    const newData = [new Inline(storageSvgDuplicate), ...state.data]
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
    FormUtils.copyStringToClipboard(data.svg)
  }

  async function copyOptimized() {
    const optimizedString = optimize(data.svg)
    FormUtils.copyStringToClipboard(optimizedString.data)
  }

  async function downloadOriginal() {
    const pageData = await StorageUtils.getPageData(state.collectionId)
    FormUtils.downloadSvgString(data.svg, pageData.host)
  }

  return {
    copyOptimized,
    copyOriginal,
    deleteItem,
    downloadOriginal,
    duplicateItem,
  }
}
