import * as ff from '@google-cloud/functions-framework'
import { Storage } from '@google-cloud/storage'
import { Config, State, transform } from '@svgr/core'
import { format } from 'prettier'

const storage = new Storage()

export type SVGRMessage = {
  config: Config
  state: State
  svg: string
}

export type StringMessage = {
  message: string
}

export type ServerMessage =
  | { payload: SVGRMessage; type: 'svgr' }
  | { payload: StringMessage; type: 'error' }
  | { payload: StringMessage; type: 'feedback' }

ff.http('svgr', async (req: ff.Request, res: ff.Response) => {
  switch (req.body.type) {
    case 'feedback': {
      try {
        const { message } = req.body.payload as StringMessage
        const bucketName = 'svg-gobbler'
        const destFileName = `feedback/feedback-${Date.now()}.txt`
        await storage.bucket(bucketName).file(destFileName).save(message)
      } catch (error) {
        console.error(error)
        res.send('Unable to upload message to database 😥')
      }
      break
    }

    case 'error': {
      try {
        const { message } = req.body.payload as StringMessage
        const bucketName = 'svg-gobbler'
        const destFileName = `error/error-${Date.now()}.txt`
        await storage.bucket(bucketName).file(destFileName).save(message)
      } catch (error) {
        console.error(error)
        res.send('Unable to upload message to database 😥')
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
