import htmlParser from 'prettier/plugins/html'
import { format } from 'prettier/standalone'
import type { ExportSvg } from 'src/layout/collection/export-panel/use-export-actions'
import type { ExportState } from 'src/providers'
import { logger } from './logger'

const SVG_NS = 'http://www.w3.org/2000/svg'
const XMLNS_NS = 'http://www.w3.org/2000/xmlns/'

function createElementNS(namespace: string, tag: string, attributes: Record<string, string> = {}) {
  const element = document.createElementNS(namespace, tag)
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'xmlns') {
      element.setAttributeNS(XMLNS_NS, key, value)
    } else {
      element.setAttribute(key, value)
    }
  })
  return element
}

function extractAttribute(svgString: string, attribute: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgString, 'image/svg+xml')
  const svg = doc.documentElement
  const value = svg.getAttribute(attribute)
  if (!value) {
    throw new Error(`No ${attribute} found`)
  }
  return value
}

function getInnerSvgContent(svgString: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgString, 'image/svg+xml')
  const svg = doc.documentElement
  return Array.from(svg.childNodes)
    .map((node) => {
      if (node instanceof Element) {
        return node.outerHTML
      }
      return node.textContent || ''
    })
    .join('')
}

function buildInvisibleSpriteSvg() {
  return createElementNS(SVG_NS, 'svg', {
    xmlns: SVG_NS,
    display: 'none',
  }) as SVGElement
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

function buildSpriteSvg(exportSvgs: ExportSvg[], exportState: ExportState) {
  const sprite = buildInvisibleSpriteSvg()
  exportSvgs.forEach((exportSvg) => sprite.appendChild(buildSymbolElement(exportSvg, exportState)))
  return sprite
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
  head.appendChild(createElementNS('', 'meta', { charset: 'UTF-8' }))
  head.appendChild(
    createElementNS('', 'meta', {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    }),
  )

  // Add title and styles
  const title = document.createElement('title')
  title.textContent = 'SVG Sprite Demo'
  head.appendChild(title)

  const style = document.createElement('style')
  style.textContent = DEMO_STYLES
  head.appendChild(style)

  // Add sprite to document
  body.appendChild(sprite)

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
  container.appendChild(header)

  const iconsGrid = document.createElement('div')
  iconsGrid.classList.add('icons-grid')

  exportSvgs.forEach((exportSvg) => {
    const demo = document.createElement('div')
    demo.classList.add('icon-demo')

    const svg = createElementNS(SVG_NS, 'svg', {
      class: 'icon-svg',
    })

    svg.appendChild(buildUseElement(exportSvg.name, exportState))
    demo.appendChild(svg)

    const name = document.createElement('p')
    name.classList.add('icon-name')
    name.textContent = `${exportState.settings.sprite.prefix}${exportSvg.name}${exportState.settings.sprite.suffix}`
    demo.appendChild(name)

    iconsGrid.appendChild(demo)
  })

  container.appendChild(iconsGrid)

  const usageExample = document.createElement('div')
  usageExample.classList.add('usage-example')

  const usageTitle = document.createElement('h2')
  usageTitle.textContent = 'How to Use'

  const usageCode = document.createElement('pre')
  usageCode.textContent = USAGE_EXAMPLE

  usageExample.append(usageTitle, usageCode)
  container.appendChild(usageExample)

  body.appendChild(container)
  html.append(head, body)
  document.appendChild(html)

  return format(document.documentElement.outerHTML, {
    parser: 'html',
    plugins: [htmlParser],
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: true,
  })
}

export function buildSpriteAndDemo(exportSvgs: ExportSvg[], exportState: ExportState) {
  const sprite = buildSpriteSvg(exportSvgs, exportState)
  const demoHtml = buildDemoDocument(sprite, exportSvgs, exportState)

  return {
    sprite,
    demoHtml,
  }
}
