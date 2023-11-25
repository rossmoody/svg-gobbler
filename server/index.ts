import { transform } from '@svgr/core'
import bodyParser from 'body-parser'
import express from 'express'
import { format } from 'prettier'
import babel from 'prettier/parser-babel'
import { SvgrMessage } from 'src/layout/details/preview-sidebar/use-svgr'

const port = 3000
const app = express().use(bodyParser.json())

app.post('/svgr', async (req, res) => {
  try {
    const { svg, config, state } = req.body as SvgrMessage
    const result = await transform(svg, config, state)
    console.log({ result })
    // Problem with svgr prettier: https://github.com/gregberge/svgr/issues/893
    const formatted = await format(result, { parser: 'babel-ts', plugins: [babel] })
    res.send(formatted)
  } catch (error) {
    console.error(error)
    res.send('Unable to transform SVG 😥')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
