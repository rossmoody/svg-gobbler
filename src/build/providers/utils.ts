import SVG from '../../find/svg-class'

export function paginateContent(content: SVG[]) {
  const perPage = 100

  if (content.length <= perPage) return [content]

  const result = content.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perPage)
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [] as SVG[][])

  return result
}

export const sessionStorageData = (): SVG[][] | undefined => {
  const windowId = window.location.host
  const data = sessionStorage.getItem(windowId)
  if (data) return JSON.parse(data)
  return undefined
}
