import { format } from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'

export async function reactify(svgString: string) {
  const res = await fetch(
    'https://www.svggobbler.com/.netlify/functions/svgr',
    {
      headers: {
        'content-type': 'application/json',
      },
      method: 'post',
      body: svgString,
    }
  )

  const json = await res.json()

  return format(json, {
    parser: 'babel',
    plugins: [parserBabel],
  })
}
