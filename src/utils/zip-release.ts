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
  console.log('---')
  console.log(`File ${fileName} has been created for Chrome`)

  // Amend the manifest file for Firefox
  const manifestPath = path.join(distPath, 'manifest.json')
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))

  manifest.browser_specific_settings = {
    gecko: {
      id: '{7962ff4a-5985-4cf2-9777-4bb642ad05b8}',
    },
  }

  manifest.background = {
    scripts: ['service-worker-loader.js'],
    type: 'module',
  }

  manifest.web_accessible_resources = [
    {
      matches: ['<all_urls>'],
      resources: ['assets/prod/**/*.png', 'assets/dev/**/*.png'],
    },
  ]

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
  console.log('---')
  console.log('Firefox manifest updated and ready for bundle')
})

archive.pipe(output)
archive.directory(distPath, false)
archive.finalize()
