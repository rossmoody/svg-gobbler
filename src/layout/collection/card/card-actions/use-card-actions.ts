import type { Svg } from 'svg-gobbler-scripts'

import { nanoid } from 'nanoid'
import { useRevalidator } from 'react-router-dom'
import { useCollection } from 'src/providers'
import { FormUtils } from 'src/utils/form-utils'
import { StorageUtils } from 'src/utils/storage-utils'
import { SvgUtils } from 'src/utils/svg-utils'
import { Inline } from 'svg-gobbler-scripts'

export const useCardActions = (data: Svg) => {
  const { state } = useCollection()
  const { revalidate } = useRevalidator()

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

  async function downloadOriginal() {
    const pageData = await StorageUtils.getPageData(state.collectionId)
    FormUtils.downloadSvgString(data.originalString, pageData.host)
  }

  return {
    copyOriginal,
    deleteItem,
    downloadOriginal,
    duplicateItem,
  }
}
