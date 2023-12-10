import archiver from 'archiver'
import fs from 'fs'
import path from 'path'

import packageJson from '../../package.json' assert { type: 'json' }

const rootPath = process.cwd()
const distPath = path.join(rootPath, 'dist')
const fileName = `${packageJson.version}.zip`
const outputPath = path.join(rootPath, 'releases', fileName)

// Create releases folder if not exists
if (!fs.existsSync(path.join(rootPath, 'releases'))) {
  fs.mkdirSync(path.join(rootPath, 'releases'))
}

const output = fs.createWriteStream(outputPath)
const archive = archiver('zip')

output.on('close', () => {
  console.log(`${archive.pointer()} total bytes`)
  console.log(`File ${fileName} has been created`)
})

archive.pipe(output)
archive.directory(distPath, false)
archive.finalize()
