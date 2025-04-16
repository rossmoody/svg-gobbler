import type { Collection, PageData } from 'src/types'

import JSZip from 'jszip'
import { StorageUtils } from 'src/utils/storage-utils'

export const useExportData = () => {
  const exportAllDataAsJson = async () => {
    const data: Promise<PageData>[] = []
    const collections = (await StorageUtils.getStorageData<Collection[]>('collections')) ?? []

    for (const collection of collections) {
      data.push(StorageUtils.getPageData(collection.id))
    }

    await Promise.all(data)
      .then((data) => {
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'data.json'
        a.click()
        URL.revokeObjectURL(url)
      })
      .catch(() => {
        alert('Error exporting data')
      })
  }

  const exportAllDataAsZip = async () => {
    const collections = (await StorageUtils.getStorageData<Collection[]>('collections')) ?? []

    const zip = new JSZip()

    await Promise.all(
      collections.map(async (collection) => {
        const dir = zip.folder(collection.name)
        if (!dir) return

        const collectionData = await StorageUtils.getPageData(collection.id)
        for (const item of collectionData.data) {
          const svg = item.svg
          const name = item.name
          dir.file(`${name}.svg`, svg)
        }
      }),
    )

    try {
      const content = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(content)
      const a = document.createElement('a')
      a.href = url
      a.download = 'data.zip'
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating zip file:', error)
      alert('Error exporting data')
    }
  }

  const exportCurrentCollectionDataAsZip = async (collectionId: string) => {
    const collection = await StorageUtils.getPageData(collectionId)
    const collections = (await StorageUtils.getStorageData<Collection[]>('collections')) ?? []
    const collectionName = collections.find((c) => c.id === collectionId)?.name || 'collection-data'

    const zip = new JSZip()
    const dir = zip.folder(collectionName)
    if (!dir) return

    for (const item of collection.data) {
      const svg = item.svg
      const name = item.name
      dir.file(`${name}.svg`, svg)
    }

    try {
      const content = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(content)
      const a = document.createElement('a')
      a.href = url
      a.download = `${collectionName}.zip`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating zip file:', error)
      alert('Error exporting data')
    }
  }

  return { exportAllDataAsJson, exportAllDataAsZip, exportCurrentCollectionDataAsZip }
}
