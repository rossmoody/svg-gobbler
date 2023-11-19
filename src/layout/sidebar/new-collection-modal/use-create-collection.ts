import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import { useDashboard } from 'src/providers'
import { Collection, PageData, StorageSvg } from 'src/types'
import { FormUtils } from 'src/utils/form-utils'
import { StorageUtils } from 'src/utils/storage-utils'

export const useCreateCollection = (files: File[]) => {
  const navigate = useNavigate()
  const { state, dispatch } = useDashboard()

  return async function (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const id = nanoid()
    const svgFileData = await FormUtils.handleUpload(files)
    const svgStorageData: StorageSvg[] = svgFileData.map((svg) => ({
      id: nanoid(),
      svg,
    }))

    const pageData: PageData = {
      host: '',
      origin: '',
      data: svgStorageData,
    }

    const collection: Collection = {
      id,
      name,
      origin: '',
    }

    const collections = [collection, ...state.collections]

    await StorageUtils.setPageData(id, pageData)
    await StorageUtils.setStorageData('collections', collections)
    dispatch({ type: 'set-collections', payload: collections })
    navigate(`/dashboard/collection/${id}`)

    // Close the modal, I'm being lazy here
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
  }
}
