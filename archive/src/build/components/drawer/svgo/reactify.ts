export async function reactify(svgString: string) {
  const res = await fetch(
    'https://us-central1-svg-gobbler.cloudfunctions.net/SVGR',
    {
      headers: {
        'content-type': 'text/html',
      },
      method: 'post',
      body: svgString,
    }
  )

  const json = await res.text()
  return json
}
