import { svgo } from './svgo'

export const createDownload = svg => {
  const btnLink = document.createElement('a')
  document.body.appendChild(btnLink)
  const filename = svg.filename

  svgo.optimize(svg.source).then(function(result) {
    const url = window.URL.createObjectURL(
      new Blob([result.data], { type: 'text/xml' })
    )
    btnLink.setAttribute('download', `${filename}.svg`)
    btnLink.setAttribute('href', url)
    btnLink.click()
  })
}
