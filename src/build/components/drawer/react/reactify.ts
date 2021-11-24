export async function reactify(svgString: string) {
  const res = await fetch('https://stoisy.com', {
    headers: {
      'content-type': 'text/html',
    },
    method: 'post',
    body: svgString,
  })

  const json = await res.text()
  return json
}
