import * as ff from '@google-cloud/functions-framework'
import { Storage } from '@google-cloud/storage'
import { Config, State, transform } from '@svgr/core'
import { format } from 'prettier'

const storage = new Storage()

export type ServerMessage =
  | { payload: StringMessage; type: 'error' }
  | { payload: StringMessage; type: 'feedback' }
  | { payload: SVGRMessage; type: 'svgr' }

export type StringMessage = {
  message: string
}

export type SVGRMessage = {
  config: Config
  state: State
  svg: string
}

ff.http('svgr', async (request: ff.Request, res: ff.Response) => {
  switch (request.body.type) {
    case 'error': {
      try {
        const { message } = request.body.payload as StringMessage
        const bucketName = 'svg-gobbler'
        const destinationFileName = `error/error-${Date.now()}.txt`
        await storage.bucket(bucketName).file(destinationFileName).save(message)
      } catch (error) {
        console.error(error)
        res.send('Unable to upload message to database 😥')
      }
      break
    }

    case 'feedback': {
      try {
        const { message } = request.body.payload as StringMessage
        const bucketName = 'svg-gobbler'
        const destinationFileName = `feedback/feedback-${Date.now()}.txt`
        await storage.bucket(bucketName).file(destinationFileName).save(message)
      } catch (error) {
        console.error(error)
        res.send('Unable to upload message to database 😥')
      }
      break
    }

    case 'svgr': {
      try {
        const { config, state, svg } = request.body.payload as SVGRMessage
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
