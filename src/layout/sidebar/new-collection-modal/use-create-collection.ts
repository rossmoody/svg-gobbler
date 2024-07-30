import type { Collection, PageData } from 'src/types'

import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import { useDashboard } from 'src/providers'
import { FormUtils } from 'src/utils/form-utils'
import { StorageUtils } from 'src/utils/storage-utils'
import { SvgUtils } from 'src/utils/svg-utils'
import { StorageSvg } from 'svg-gobbler-scripts'

export const useCreateCollection = (files: File[]) => {
  const navigate = useNavigate()
  const { dispatch, state } = useDashboard()

  return async function (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const id = nanoid()
    const svgFileData = await FormUtils.handleUpload(files)
    const svgStorageData: StorageSvg[] = svgFileData.map(SvgUtils.createStorageSvg)

    const pageData: PageData = {
      data: svgStorageData,
      host: '',
      href: '',
      origin: '',
    }

    const collection: Collection = {
      href: '',
      id,
      name,
      origin: '',
    }

    const collections = [collection, ...state.collections]

    await StorageUtils.setPageData(id, pageData)
    await StorageUtils.setStorageData('collections', collections)
    dispatch({ payload: collections, type: 'set-collections' })
    navigate(`/dashboard/collection/${id}`)

    // Close the modal, I'm being lazy here
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
  }
}
