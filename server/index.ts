import bodyParser from 'body-parser'
import express from 'express'

const port = 3000
const app = express().use(bodyParser.json())

app.post('/svgr', (req, res) => {
  const svgString = req.body.svg
  console.log(svgString)
  res.send(`Hello World! ${svgString}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
