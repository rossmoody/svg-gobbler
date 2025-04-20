import type { Collection, PageData } from 'src/types'

import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import { useDashboard } from 'src/providers'
import { StorageSvg } from 'src/scripts'
import { formUtilities } from 'src/utilities/form-utilities'
import { StorageUtilities } from 'src/utilities/storage-utilities'
import { SvgUtilities } from 'src/utilities/svg-utilities'

export const useCreateCollection = (files: File[]) => {
  const navigate = useNavigate()
  const { dispatch, state } = useDashboard()

  return async function (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const id = nanoid()
    const svgFileData = await formUtilities.handleUpload(files)
    const svgStorageData: StorageSvg[] = svgFileData.map(SvgUtilities.createStorageSvg)

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

    await StorageUtilities.setPageData(id, pageData)
    await StorageUtilities.setStorageData('collections', collections)
    dispatch({ payload: collections, type: 'set-collections' })
    navigate(`/dashboard/collection/${id}`)

    // Close the modal, I'm being lazy here
    globalThis.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
  }
}
