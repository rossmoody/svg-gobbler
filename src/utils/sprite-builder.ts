import type { ExportSvg } from 'src/layout/collection/main-panel/use-export-actions'
import type { ExportState } from 'src/providers'

import htmlParser from 'prettier/plugins/html'
import { format } from 'prettier/standalone'

import { logger } from './logger'

const SVG_NS = 'http://www.w3.org/2000/svg'
const XMLNS_NS = 'http://www.w3.org/2000/xmlns/'

function buildInvisibleSpriteSvg() {
  return createElementNS(SVG_NS, 'svg', {
    display: 'none',
    xmlns: SVG_NS,
  }) as SVGElement
}

function buildSpriteSvg(exportSvgs: ExportSvg[], exportState: ExportState) {
  const sprite = buildInvisibleSpriteSvg()
  for (const exportSvg of exportSvgs) sprite.append(buildSymbolElement(exportSvg, exportState))
  return sprite
}

function buildSymbolElement(exportSvg: ExportSvg, exportState: ExportState) {
  let viewBox

  try {
    viewBox = extractAttribute(exportSvg.payload, 'viewBox')
  } catch (error) {
    logger.error(error)
  }
  const symbol = createElementNS(SVG_NS, 'symbol', {
    id: `${exportState.settings.sprite.prefix}${exportSvg.name}${exportState.settings.sprite.suffix}`,
  })

  if (viewBox) {
    symbol.setAttribute('viewBox', viewBox)
  }

  symbol.innerHTML = getInnerSvgContent(exportSvg.payload)
  return symbol
}

function buildUseElement(symbolId: string, exportState: ExportState) {
  return createElementNS(SVG_NS, 'use', {
    href: `#${exportState.settings.sprite.prefix}${symbolId}${exportState.settings.sprite.suffix}`,
  })
}

function createElementNS(namespace: string, tag: string, attributes: Record<string, string> = {}) {
  const element = document.createElementNS(namespace, tag)
  for (const [key, value] of Object.entries(attributes)) {
    if (key === 'xmlns') {
      element.setAttributeNS(XMLNS_NS, key, value)
    } else {
      element.setAttribute(key, value)
    }
  }
  return element
}

function extractAttribute(svgString: string, attribute: string): string {
  const parser = new DOMParser()
  const document_ = parser.parseFromString(svgString, 'image/svg+xml')
  const svg = document_.documentElement
  const value = svg.getAttribute(attribute)
  if (!value) {
    throw new Error(`No ${attribute} found`)
  }
  return value
}

function getInnerSvgContent(svgString: string): string {
  const parser = new DOMParser()
  const document_ = parser.parseFromString(svgString, 'image/svg+xml')
  const svg = document_.documentElement
  return [...svg.childNodes]
    .map((node) => {
      if (node instanceof Element) {
        return node.outerHTML
      }
      return node.textContent || ''
    })
    .join('')
}

// Demo document styles
const DEMO_STYLES = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.5;
    margin: 0;
    padding: 2rem;
    background: #f5f5f5;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .header {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ddd;
  }
  
  .header h1 {
    margin: 0;
    color: #333;
  }
  
  .header p {
    color: #666;
    margin: 0.5rem 0 0;
  }
  
  .icons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }
  
  .icon-demo {
    background: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .icon-demo:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
  
  .icon-svg {
    width: 100%;
    height: 100px;
    margin-bottom: 0.5rem;
  }
  
  .icon-name {
    font-size: 0.875rem;
    color: #666;
    margin: 0;
    word-break: break-all;
  }
  
  .usage-example {
    background: #f8f9fa;
    border-radius: 4px;
    padding: 1rem;
    margin-top: 2rem;
  }
  
  .usage-example pre {
    margin: 0;
    white-space: pre-wrap;
    font-family: 'SF Mono', 'Consolas', monospace;
    font-size: 0.875rem;
  }
  
  .usage-example code {
    background: #e9ecef;
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }
`

export function buildSpriteAndDemo(exportSvgs: ExportSvg[], exportState: ExportState) {
  const sprite = buildSpriteSvg(exportSvgs, exportState)
  const demoHtml = buildDemoDocument(sprite, exportSvgs, exportState)

  return {
    demoHtml,
    sprite,
  }
}

function buildDemoDocument(sprite: SVGElement, exportSvgs: ExportSvg[], exportState: ExportState) {
  const USAGE_EXAMPLE = `<!-- Include the sprite SVG in your HTML -->
  <svg style="display: none;">
    <!-- Your sprite content here -->
  </svg>

  <!-- Use an icon -->
  <svg>
    <use href="#${exportState.settings.sprite.prefix}icon-name${exportState.settings.sprite.suffix}"></use>
  </svg>

  <svg height="100">
    <use href="#${exportState.settings.sprite.prefix}icon-name${exportState.settings.sprite.suffix}"></use>
  </svg>`

  const document = new Document()
  const html = document.createElement('html')
  const head = document.createElement('head')
  const body = document.createElement('body')

  // Add meta tags
  head.append(createElementNS('', 'meta', { charset: 'UTF-8' }))
  head.append(
    createElementNS('', 'meta', {
      content: 'width=device-width, initial-scale=1.0',
      name: 'viewport',
    }),
  )

  // Add title and styles
  const title = document.createElement('title')
  title.textContent = 'SVG Sprite Demo'
  head.append(title)

  const style = document.createElement('style')
  style.textContent = DEMO_STYLES
  head.append(style)

  // Add sprite to document
  body.append(sprite)

  // Create container and header
  const container = document.createElement('div')
  container.classList.add('container')

  const header = document.createElement('div')
  header.classList.add('header')

  const h1 = document.createElement('h1')
  h1.textContent = 'SVG Gobbler Sprite Demo'

  const description = document.createElement('p')
  description.textContent = `This demo demonstrates ${exportSvgs.length} icons from your sprite sheet.`

  header.append(h1, description)
  container.append(header)

  const iconsGrid = document.createElement('div')
  iconsGrid.classList.add('icons-grid')

  for (const exportSvg of exportSvgs) {
    const demo = document.createElement('div')
    demo.classList.add('icon-demo')

    const svg = createElementNS(SVG_NS, 'svg', {
      class: 'icon-svg',
    })

    svg.append(buildUseElement(exportSvg.name, exportState))
    demo.append(svg)

    const name = document.createElement('p')
    name.classList.add('icon-name')
    name.textContent = `${exportState.settings.sprite.prefix}${exportSvg.name}${exportState.settings.sprite.suffix}`
    demo.append(name)

    iconsGrid.append(demo)
  }

  container.append(iconsGrid)

  const usageExample = document.createElement('div')
  usageExample.classList.add('usage-example')

  const usageTitle = document.createElement('h2')
  usageTitle.textContent = 'How to Use'

  const usageCode = document.createElement('pre')
  usageCode.textContent = USAGE_EXAMPLE

  usageExample.append(usageTitle, usageCode)
  container.append(usageExample)

  body.append(container)
  html.append(head, body)
  document.append(html)

  return format(document.documentElement.outerHTML, {
    parser: 'html',
    plugins: [htmlParser],
    printWidth: 100,
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    useTabs: false,
  })
}
