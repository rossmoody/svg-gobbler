import * as ff from '@google-cloud/functions-framework'
import { Config, State, transform } from '@svgr/core'
import { format } from 'prettier'

export type SvgrMessage = {
  svg: string
  config: Config
  state: State
}

ff.http('svgr', async (req: ff.Request, res: ff.Response) => {
  try {
    const { svg, config, state } = req.body as SvgrMessage
    const result = await transform(svg, config, state)
    // Problem with svgr prettier: https://github.com/gregberge/svgr/issues/893
    const formatted = await format(result, {
      parser: 'babel-ts',
      plugins: [require('prettier/plugins/babel')],
    })
    res.send(formatted)
  } catch (error) {
    console.error(error)
    res.send('Unable to transform SVG 😥')
  }
})
