import SVG from 'src/find/SVG'

export function paginateContent(content: SVG[]) {
  const perPage = 100

  if (content.length <= perPage) return [content]

  return content.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perPage)
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [] as SVG[][])
}
