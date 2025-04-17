import { useCollection, useEdit } from 'src/providers'
import { StorageUtilities } from 'src/utilities/storage-utilities'

export const useEditData = () => {
  const { state: editState } = useEdit()
  const { dispatch: collectionDispatch, state: collectionState } = useCollection()

  async function handleUpdateProperties() {
    const { collectionId, data, selected } = collectionState
    const { custom, standard } = editState

    const updatedSelectedSvgs = selected.map((svg) => {
      const svgClone = svg.createClone()

      for (const [key, value] of Object.entries(standard)) {
        if (value && svgClone.asElement) {
          svgClone.asElement.setAttribute(key, value)
          svgClone.svg = svgClone.asElement.outerHTML
          svgClone.stampLastEdited()
        }
      }

      if (custom.name && custom.value && svgClone.asElement) {
        svgClone.asElement.setAttribute(custom.name, custom.value)
        svgClone.svg = svgClone.asElement.outerHTML
        svgClone.stampLastEdited()
      }

      return svgClone
    })

    const updatedCollection = data.map((svg) => {
      const updatedSvg = updatedSelectedSvgs.find((updated) => updated.id === svg.id)
      return updatedSvg || svg
    })

    const pageData = await StorageUtilities.getPageData(collectionId)
    StorageUtilities.setPageData(collectionId, { ...pageData, data: updatedCollection })
    collectionDispatch({ payload: updatedCollection, type: 'set-data' })
    collectionDispatch({ payload: updatedSelectedSvgs, type: 'set-selected' })
    collectionDispatch({ type: 'process-data' })
  }

  return { handleUpdateProperties }
}
