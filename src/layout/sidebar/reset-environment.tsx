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

    const collectionOne: Collection = {
      id: nanoid(),
      name: 'Collection One',
      origin: '',
    }

    const pageDataOne: PageData = {
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

    const collectionTwo: Collection = {
      id: nanoid(),
      name: 'signal.org',
      origin: 'signal.org',
    }

    const pageDataTwo: PageData = {
      data: [
        SvgUtils.createStorageSvg(
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><title>Artboard 1 copy</title><path d="M150,28.6a64.3,64.3,0,0,1-15.4,15.8c0,.9.1,2.3.1,4a87.4,87.4,0,0,1-3.6,24.7,92.5,92.5,0,0,1-11,23.7,96.1,96.1,0,0,1-17.6,20A77.9,77.9,0,0,1,78,130.7a89.3,89.3,0,0,1-30.8,5.2A85.4,85.4,0,0,1,0,122.1a56,56,0,0,0,7.4.4,60.6,60.6,0,0,0,38.2-13.1,30.3,30.3,0,0,1-17.9-6.2A29.7,29.7,0,0,1,16.8,88a31.3,31.3,0,0,0,5.9.5,30.8,30.8,0,0,0,8-1A30.5,30.5,0,0,1,13.1,76.9a29.8,29.8,0,0,1-7-19.6v-.4A30.5,30.5,0,0,0,20,60.8,30.8,30.8,0,0,1,10,49.9,29.7,29.7,0,0,1,6.3,35.2a30.1,30.1,0,0,1,4.2-15.5,86,86,0,0,0,28,22.7,86.4,86.4,0,0,0,35.4,9.5,35.1,35.1,0,0,1-.8-7.1,29.5,29.5,0,0,1,9-21.7,29.5,29.5,0,0,1,21.7-9,29.6,29.6,0,0,1,22.5,9.7,60,60,0,0,0,19.5-7.4,29.4,29.4,0,0,1-13.5,16.9A61.2,61.2,0,0,0,150,28.6Z"/></svg>',
        ),
        SvgUtils.createStorageSvg(
          '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 54 54"><path d="M-.2.1h53.8v53.4H-.2z" style="fill:none"/><path d="M48.1 26.3c0 4.3 0 7.2-.1 8.8-.2 3.9-1.3 6.9-3.5 9s-5.1 3.3-9 3.5c-1.6.1-4.6.1-8.8.1-4.3 0-7.2 0-8.8-.1-3.9-.2-6.9-1.3-9-3.5-2.1-2.1-3.3-5.1-3.5-9-.1-1.6-.1-4.6-.1-8.8s0-7.2.1-8.8c.2-3.9 1.3-6.9 3.5-9C11 6.4 14 5.2 17.9 5c1.6-.1 4.6-.1 8.8-.1 4.3 0 7.2 0 8.8.1 3.9.2 6.9 1.3 9 3.5s3.3 5.1 3.5 9c0 1.6.1 4.5.1 8.8M28.8 8.7h-7.1c-.7 0-1.6 0-2.7.1-1.1 0-2.1.1-2.9.3-.8.1-1.5.3-2 .5-.9.4-1.7.9-2.5 1.6-.7.7-1.2 1.5-1.6 2.5-.2.5-.4 1.2-.5 2s-.2 1.7-.3 2.9c0 1.1-.1 2-.1 2.7v10c0 .7 0 1.6.1 2.7 0 1.1.1 2.1.3 2.9s.3 1.5.5 2c.4.9.9 1.7 1.6 2.5.7.7 1.5 1.2 2.5 1.6.5.2 1.2.4 2 .5s1.7.2 2.9.3 2 .1 2.7.1h10c.7 0 1.6 0 2.7-.1 1.1 0 2.1-.1 2.9-.3.8-.1 1.5-.3 2-.5.9-.4 1.7-.9 2.5-1.6.7-.7 1.2-1.5 1.6-2.5.2-.5.4-1.2.5-2s.2-1.7.3-2.9c0-1.1.1-2 .1-2.7v-10c0-.7 0-1.6-.1-2.7 0-1.1-.1-2.1-.3-2.9-.1-.8-.3-1.5-.5-2-.4-.9-.9-1.7-1.6-2.5-.7-.7-1.5-1.2-2.5-1.6-.5-.2-1.2-.4-2-.5s-1.7-.2-2.9-.3c-1.1 0-2-.1-2.7-.1zm5.6 9.8c2.1 2.1 3.2 4.7 3.2 7.8s-1.1 5.6-3.2 7.8c-2.1 2.1-4.7 3.2-7.8 3.2s-5.6-1.1-7.8-3.2c-2.1-2.1-3.2-4.7-3.2-7.8s1.1-5.6 3.2-7.8c2.1-2.1 4.7-3.2 7.8-3.2s5.7 1 7.8 3.2m-2.7 12.8c1.4-1.4 2.1-3.1 2.1-5s-.7-3.7-2.1-5.1q-2.1-2.1-5.1-2.1t-5.1 2.1c-2.1 2.1-2.1 3.1-2.1 5.1s.7 3.7 2.1 5q2.1 2.1 5.1 2.1t5.1-2.1M39.9 13c.5.5.8 1.1.8 1.8s-.3 1.3-.8 1.8-1.1.8-1.8.8-1.3-.3-1.8-.8-.8-1.1-.8-1.8.3-1.3.8-1.8 1.1-.8 1.8-.8 1.3.3 1.8.8"/></svg>',
        ),
        SvgUtils.createStorageSvg(
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64m324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6M487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64M120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64m39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6M19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6z"/></svg>',
        ),
      ],
      host: 'signal.org',
      origin: 'signal.org',
    }

    await StorageUtils.setPageData(collectionOne.id, pageDataOne)
    await StorageUtils.setPageData(collectionTwo.id, pageDataTwo)
    await StorageUtils.setStorageData('collections', [collectionOne, collectionTwo])
    window.location.reload()
  }

  return (
    <button className="collection-item" onClick={handleResetEnvironment}>
      <ArrowUturnDownIcon aria-hidden="true" className="h-4 w-4 shrink-0 " />
      {loc('sidebar_reset')}
    </button>
  )
}
