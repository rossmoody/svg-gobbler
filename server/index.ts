import * as ff from '@google-cloud/functions-framework'
import { Config, State, transform } from '@svgr/core'
import { format } from 'prettier'

export type SVGRMessage = {
  config: Config
  state: State
  svg: string
}

export type FeedbackMessage = {
  feedback: string
}

export type ServerMessage =
  | { payload: FeedbackMessage; type: 'feedback' }
  | { payload: SVGRMessage; type: 'svgr' }

ff.http('server', async (req: ff.Request, res: ff.Response) => {
  switch (req.body.type) {
    case 'feedback': {
      try {
        const { feedback } = req.body.payload as FeedbackMessage
        console.log(feedback)
        res.send(feedback)
      } catch (error) {
        console.error(error)
      }
      break
    }

    case 'svgr': {
      try {
        const { config, state, svg } = req.body.payload as SVGRMessage
        const result = await transform(svg, config, state)
        const formatted = await format(result, {
          parser: 'babel-ts',
          plugins: [require('prettier/plugins/babel')],
        })
        res.send(formatted)
      } catch (error) {
        console.error(error)
        res.send('Unable to transform SVG 😥')
      }
      break
    }

    default: {
      res.send('Unable to process request 😥')
    }
  }
})
