import type { StorageSvg, Svg } from 'src/scripts'

import { nanoid } from 'nanoid'
import { useRevalidator } from 'react-router-dom'
import { useCollection } from 'src/providers'
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
    await StorageUtilities.updatePageData(
      state.collectionId,
      (current) => ({ ...current, data: [storageSvgDuplicate, ...current.data] }),
      state.data,
    )
    revalidate()
  }

  async function deleteItem() {
    await StorageUtilities.updatePageData(
      state.collectionId,
      (current) => ({ ...current, data: current.data.filter((item) => item.id !== data.id) }),
      state.data,
    )
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
    formUtilities.downloadSvgString(data.svg, data.name)
  }

  async function copyBase64DataUri() {
    const base64DataUri = SvgUtilities.createBase64DataUri(data.svg)
    formUtilities.copyStringToClipboard(base64DataUri)
  }

  async function copyEncodedDataUri() {
    const encodedDataUri = SvgUtilities.createEncodedDataUri(data.svg)
    formUtilities.copyStringToClipboard(encodedDataUri)
  }

  async function copyMinifiedDataUri() {
    const minifiedDataUri = SvgUtilities.createMinifiedDataUri(data.svg)
    formUtilities.copyStringToClipboard(minifiedDataUri)
  }

  return {
    copyBase64DataUri,
    copyEncodedDataUri,
    copyMinifiedDataUri,
    copyOptimized,
    copyOriginal,
    deleteItem,
    downloadOriginal,
    duplicateItem,
  }
}
