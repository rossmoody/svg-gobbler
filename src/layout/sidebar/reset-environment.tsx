import { ArrowUturnDownIcon } from '@heroicons/react/24/outline'
import { dummyStorageSvg, emptyCollection, emptyPageData } from 'src/constants/models'
import { StorageUtils } from 'src/utils/storage-utils'

export const ResetEnvironment = () => {
  const handleResetEnvironment = async () => {
    await chrome.storage.local.clear()
    const collection = emptyCollection()
    const pageData = emptyPageData()
    pageData.data = [dummyStorageSvg()]
    await StorageUtils.setPageData(collection.id, pageData)
    await StorageUtils.setStorageData('collections', [collection])
    window.location.reload()
  }

  return (
    <button className="collection-item" onClick={handleResetEnvironment}>
      <ArrowUturnDownIcon aria-hidden="true" className="h-4 w-4 shrink-0 " />
      Reset environment
    </button>
  )
}
