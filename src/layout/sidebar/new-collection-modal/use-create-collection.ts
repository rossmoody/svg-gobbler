import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import { useDashboard } from 'src/providers'
import { Collection, PageData } from 'src/types'
import { FormUtils } from 'src/utils/form-utils'
import lzString from 'src/utils/lz-string'

export const useCreateCollection = (files: File[]) => {
  const navigate = useNavigate()
  const { state, dispatch } = useDashboard()

  return async function (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const name = formData.get('name') as string

    const id = nanoid()
    const svgFileData = await FormUtils.handleUpload(files)

    const pageData: PageData = {
      host: '',
      origin: '',
      data: svgFileData,
    }

    const collection: Collection = {
      id,
      name,
      origin: name,
    }

    const collections = [collection, ...state.collections]
    const collectionData = { [id]: lzString.compressToBase64(pageData) }

    await chrome.storage.local.set(collectionData)
    await chrome.storage.local.set({ collections })
    dispatch({ type: 'set-collections', payload: collections })
    navigate(`/dashboard/collection/${id}`)

    // Close the modal, I'm being lazy here
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
  }
}
