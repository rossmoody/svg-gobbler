import * as ff from '@google-cloud/functions-framework'
import { Storage } from '@google-cloud/storage'
import { Config, State, transform } from '@svgr/core'
import { format } from 'prettier'

const storage = new Storage()

export type ServerMessage =
  | { payload: StringMessage; type: 'counter' }
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

ff.http('svgr', async (request: ff.Request, response: ff.Response) => {
  switch (request.body.type) {
    /**
     * Increment a daily counter stored in a JSON file to show the total sourced SVGs on svggobbler.com
     */
    case 'counter': {
      try {
        const { message } = request.body.payload as StringMessage
        const bucketName = 'svg-gobbler'
        const destinationFileName = `counter/counter.json`
        const file = storage.bucket(bucketName).file(destinationFileName)
        const [exists] = await file.exists()
        const today = new Date().toISOString().split('T')[0]
        let data: { [key: string]: number } = {}

        if (exists) {
          const [contents] = await file.download()
          try {
            data = JSON.parse(contents.toString())
          } catch {
            data = {}
          }
        }

        const increment = Number.parseInt(message, 10) || 0
        const currentCount = data[today] ?? 0
        const newCount = currentCount + increment
        data[today] = newCount

        await file.save(JSON.stringify(data, undefined, 2), {
          metadata: {
            cacheControl: 'no-cache, no-store, must-revalidate',
          },
        })
        response.send('Counter updated successfully')
      } catch (error) {
        console.error(error)
        response.send('Unable to increment counter 😥')
      }
      break
    }

    /**
     * Give users an easy way to report errors they encounter while using SVG Gobbler
     */
    case 'error': {
      try {
        const { message } = request.body.payload as StringMessage
        const bucketName = 'svg-gobbler'
        const destinationFileName = `error/error-${Date.now()}.txt`
        await storage.bucket(bucketName).file(destinationFileName).save(message)
      } catch (error) {
        console.error(error)
        response.send('Unable to upload message to database 😥')
      }
      break
    }

    /**
     * Collect user feedback to help improve SVG Gobbler over time
     */
    case 'feedback': {
      try {
        const { message } = request.body.payload as StringMessage
        const bucketName = 'svg-gobbler'
        const destinationFileName = `feedback/feedback-${Date.now()}.txt`
        await storage.bucket(bucketName).file(destinationFileName).save(message)
      } catch (error) {
        console.error(error)
        response.send('Unable to upload message to database 😥')
      }
      break
    }

    /**
     * Transform an SVG using SVGR and return the result
     */
    case 'svgr': {
      try {
        const { config, state, svg } = request.body.payload as SVGRMessage
        const result = await transform(svg, config, state)
        const formatted = await format(result, {
          parser: 'babel-ts',
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          plugins: [require('prettier/plugins/babel')],
        })
        response.send(formatted)
      } catch (error) {
        console.error(error)
        response.send('Unable to transform SVG 😥')
      }
      break
    }

    default: {
      response.send('Unable to process request 😥')
    }
  }
})
