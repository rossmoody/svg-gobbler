import type { Collection, PageData } from 'src/types'

import JSZip from 'jszip'
import { StorageUtilities } from 'src/utilities/storage-utilities'

async function exportAllDataAsJson() {
  const data: Promise<PageData>[] = []
  const collections = (await StorageUtilities.getStorageData<Collection[]>('collections')) ?? []

  for (const collection of collections) {
    data.push(StorageUtilities.getPageData(collection.id))
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

async function exportAllDataAsZip() {
  const collections = (await StorageUtilities.getStorageData<Collection[]>('collections')) ?? []

  const zip = new JSZip()

  await Promise.all(
    collections.map(async (collection) => {
      const directory = zip.folder(collection.name)
      if (!directory) return

      const collectionData = await StorageUtilities.getPageData(collection.id)
      for (const item of collectionData.data) {
        const svg = item.svg
        const name = item.name
        directory.file(`${name}.svg`, svg)
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

async function exportCurrentCollectionDataAsZip(collectionId: string) {
  const collection = await StorageUtilities.getPageData(collectionId)
  const collections = (await StorageUtilities.getStorageData<Collection[]>('collections')) ?? []
  const collectionName = collections.find((c) => c.id === collectionId)?.name || 'collection-data'

  const zip = new JSZip()
  const directory = zip.folder(collectionName)
  if (!directory) return

  for (const item of collection.data) {
    const svg = item.svg
    const name = item.name
    directory.file(`${name}.svg`, svg)
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

export const useExportData = () => {
  return { exportAllDataAsJson, exportAllDataAsZip, exportCurrentCollectionDataAsZip }
}
