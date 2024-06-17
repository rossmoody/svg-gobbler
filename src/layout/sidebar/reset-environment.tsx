import type { Collection } from 'src/types'

import { ArrowUturnDownIcon } from '@heroicons/react/24/outline'
import { nanoid } from 'nanoid'
import { PageData } from 'src/types'
import { loc } from 'src/utils/i18n'
import { StorageUtils } from 'src/utils/storage-utils'
import { SvgUtils } from 'src/utils/svg-utils'

export const ResetEnvironment = () => {
  const handleResetEnvironment = async () => {
    await chrome.storage.local.clear()

    const collection: Collection = {
      id: nanoid(),
      name: 'Reset Collection',
      origin: '',
    }

    const pageData: PageData = {
      data: [
        SvgUtils.createStorageSvg(
          `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"  data-view-component="true" class="octicon octicon-home"><path d="M6.906.664a1.749 1.749 0 0 1 2.187  0l5.25 4.2c.415.332.657.835.657 1.367v7.019A1.75 1.75 0 0 1 13.25 15h-3.5a.75.75 0 0 1-.75-.75V9H7v5.25a.75.75  0 0 1-.75.75h-3.5A1.75 1.75 0 0 1 1 13.25V6.23c0-.531.242-1.034.657-1.366l5.25-4.2Zm1.25 1.171a.25.25 0 0 0-.312  0l-5.25 4.2a.25.25 0 0 0-.094.196v7.019c0 .138.112.25.25.25H5.5V8.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1  .75.75v5.25h2.75a.25.25 0 0 0 .25-.25V6.23a.25.25 0 0 0-.094-.195Z"></path></svg>`,
        ),
        SvgUtils.createStorageSvg(
          `<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10"><animate attributeName="rx" values="0;5;0" dur="10s" repeatCount="indefinite" /></rect></svg>`,
        ),
      ],
      host: '',
      origin: '',
    }

    await StorageUtils.setPageData(collection.id, pageData)
    await StorageUtils.setStorageData('collections', [collection])
    window.location.reload()
  }

  return (
    <button className="collection-item" onClick={handleResetEnvironment}>
      <ArrowUturnDownIcon aria-hidden="true" className="h-4 w-4 shrink-0 " />
      {loc('sidebar_reset')}
    </button>
  )
}
