import type { StorageSvg, Svg } from 'src/scripts'

import { nanoid } from 'nanoid'
import { useRevalidator } from 'react-router-dom'
import { useCollection } from 'src/providers'
import { Inline } from 'src/scripts'
import { formUtilities } from 'src/utilities/form-utilities'
import { StorageUtilities } from 'src/utilities/storage-utilities'
import { SvgUtilities } from 'src/utilities/svg-utilities'
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
    const pageData = await StorageUtilities.getPageData(state.collectionId)
    StorageUtilities.setPageData(state.collectionId, {
      ...pageData,
      data: SvgUtilities.createStorageSvgs(newData),
    })
    revalidate()
  }

  async function deleteItem() {
    const filteredData = state.data.filter((item) => item.id !== data.id)
    const pageData = await StorageUtilities.getPageData(state.collectionId)
    StorageUtilities.setPageData(state.collectionId, {
      ...pageData,
      data: SvgUtilities.createStorageSvgs(filteredData),
    })
    revalidate()
  }

  function copyOriginal() {
    formUtilities.copyStringToClipboard(data.svg)
  }

  async function copyOptimized() {
    const optimizedString = optimize(data.svg)
    formUtilities.copyStringToClipboard(optimizedString.data)
  }

  async function downloadOriginal() {
    const pageData = await StorageUtilities.getPageData(state.collectionId)
    formUtilities.downloadSvgString(data.svg, pageData.host)
  }

  return {
    copyOptimized,
    copyOriginal,
    deleteItem,
    downloadOriginal,
    duplicateItem,
  }
}
