import type { DocumentData } from './types'

/**
 * Comprehensive SVG detection - finds ALL SVGs on a page regardless of visibility.
 * Self-contained for Chrome Manifest V3 security requirements.
 *
 * Detects 24+ SVG embedding methods:
 * - Inline <svg> elements
 * - <img>, <object>, <embed>, <iframe> with SVG sources
 * - <picture> with SVG sources
 * - <link rel="icon"> SVG favicons
 * - CSS: background-image, mask-image, clip-path, filter, content, border-image, list-style
 * - CSS custom properties with SVG data URIs
 * - Shadow DOM SVGs (open mode only)
 * - <template> elements containing SVGs
 * - External <use> references to SVG sprites
 * - <image> elements within SVGs
 * - SVG in pseudo-elements (::before, ::after)
 */
export async function findSvg(): Promise<DocumentData> {
  const document = globalThis.document
  const location = document.location

  // ============================================================================
  // UTILITY FUNCTIONS (all must be inside this scope for Manifest V3)
  // ============================================================================

  /**
   * Determines if a URL or string represents an SVG resource
   */
  const isSVGSource = (source: null | string | undefined): boolean => {
    if (!source) return false
    const normalized = source.toLowerCase().trim()
    return (
      normalized.endsWith('.svg') ||
      normalized.includes('.svg#') ||
      normalized.includes('.svg?') ||
      normalized.startsWith('data:image/svg+xml') ||
      normalized.includes('image/svg+xml')
    )
  }

  /**
   * Extracts SVG content from a data URI
   */
  const extractSVGFromDataURI = (dataUri: string): string | undefined => {
    if (!dataUri.startsWith('data:image/svg+xml')) return undefined

    const commaIndex = dataUri.indexOf(',')
    if (commaIndex === -1) return undefined
    const header = dataUri.slice(0, Math.max(0, commaIndex))
    const data = dataUri.slice(Math.max(0, commaIndex + 1))

    try {
      if (header.includes('base64')) {
        return atob(data)
      } else if (data.includes('%')) {
        return decodeURIComponent(data)
      } else {
        return data
      }
    } catch (error) {
      console.warn('Failed to decode SVG data URI:', error)
      return undefined
    }
  }

  /**
   * Safely creates an image element with source
   */
  const createImageElement = (source: string): string => {
    try {
      const img = new Image()
      img.src = source
      return img.outerHTML
    } catch (error) {
      console.warn(`Failed to create image from source: ${source}`, error)
      return ''
    }
  }

  /**
   * Serializes an SVG element to string with proper namespace
   */
  const serializeSVG = (svg: SVGElement): string => {
    try {
      const serializer = new XMLSerializer()
      let svgString = serializer.serializeToString(svg)

      // Ensure xmlns is present for standalone validity
      if (!svgString.includes('xmlns=')) {
        svgString = svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
      }
      return svgString
    } catch (error) {
      console.warn('Failed to serialize SVG:', error)
      return svg.outerHTML || ''
    }
  }

  /**
   * Extracts URLs from CSS url() functions
   */
  const extractURLsFromCSS = (cssValue: string): string[] => {
    const urls: string[] = []
    // Matches: url("..."), url('...'), url(...)
    const regex = /url\(\s*(['"]?)([^'")]+)\1\s*\)/gi
    let match

    while ((match = regex.exec(cssValue)) !== null) {
      urls.push(match[2])
    }
    return urls
  }

  // ============================================================================
  // COLLECTION ARRAYS
  // ============================================================================

  const allSvgData: string[] = []

  // ============================================================================
  // 1. INLINE SVG ELEMENTS
  // ============================================================================

  const findInlineSVGs = (root: Document | Element | ShadowRoot): void => {
    try {
      const svgs = root.querySelectorAll('svg')

      for (const svg of svgs) {
        // Skip nested SVGs - parent captures them
        if (svg.parentElement?.closest('svg')) continue

        try {
          allSvgData.push(serializeSVG(svg as SVGElement))
        } catch (error) {
          console.warn('Error processing inline SVG:', error)
        }
      }
    } catch (error) {
      console.warn('Error finding inline SVGs:', error)
    }
  }

  findInlineSVGs(document)

  // ============================================================================
  // 2. <img> ELEMENTS WITH SVG SOURCES
  // ============================================================================

  try {
    const images = document.querySelectorAll('img')

    for (const img of images) {
      // Check multiple source attributes for lazy loading, etc.
      const sources = [
        img.src,
        img.currentSrc,
        img.dataset.src,
        img.dataset.lazySrc,
        img.dataset.srcset,
      ].filter(Boolean) as string[]

      for (const source of sources) {
        if (isSVGSource(source)) {
          // For data URIs, try to extract actual SVG content
          if (source.startsWith('data:')) {
            const extracted = extractSVGFromDataURI(source)
            if (extracted) {
              allSvgData.push(extracted)
            } else {
              allSvgData.push(createImageElement(source))
            }
          } else {
            allSvgData.push(createImageElement(source))
          }
          break // Only record once per image
        }
      }
    }
  } catch (error) {
    console.warn('Error finding img SVGs:', error)
  }

  // ============================================================================
  // 3. <object> ELEMENTS WITH SVG
  // ============================================================================

  try {
    const objects = document.querySelectorAll('object')

    for (const object of objects) {
      const data = object.getAttribute('data')
      const type = object.getAttribute('type')

      if (type === 'image/svg+xml' || isSVGSource(data)) {
        // Try to access contentDocument for same-origin objects
        try {
          const contentDocument = (object as HTMLObjectElement).contentDocument
          const svg = contentDocument?.querySelector('svg')
          if (svg) {
            allSvgData.push(serializeSVG(svg as SVGElement))
          } else if (data) {
            allSvgData.push(createImageElement(data))
          }
        } catch {
          // Cross-origin or not loaded yet, use data attribute
          if (data) {
            allSvgData.push(createImageElement(data))
          }
        }
      }
    }
  } catch (error) {
    console.warn('Error finding object SVGs:', error)
  }

  // ============================================================================
  // 4. <embed> ELEMENTS WITH SVG (legacy but still valid)
  // ============================================================================

  try {
    const embeds = document.querySelectorAll('embed')

    for (const embed of embeds) {
      const source = embed.getAttribute('src')
      const type = embed.getAttribute('type')

      if ((type === 'image/svg+xml' || isSVGSource(source)) && source) {
        allSvgData.push(createImageElement(source))
      }
    }
  } catch (error) {
    console.warn('Error finding embed SVGs:', error)
  }

  // ============================================================================
  // 5. <iframe> ELEMENTS WITH SVG
  // ============================================================================

  try {
    const iframes = document.querySelectorAll('iframe')

    for (const iframe of iframes) {
      const source = iframe.src || iframe.dataset.src

      if (isSVGSource(source)) {
        try {
          const contentDocument = (iframe as HTMLIFrameElement).contentDocument
          const svg = contentDocument?.querySelector('svg')
          if (svg) {
            allSvgData.push(serializeSVG(svg as SVGElement))
          } else if (source) {
            allSvgData.push(createImageElement(source))
          }
        } catch {
          // Cross-origin
          if (source) {
            allSvgData.push(createImageElement(source))
          }
        }
      }
    }
  } catch (error) {
    console.warn('Error finding iframe SVGs:', error)
  }

  // ============================================================================
  // 6. <picture> ELEMENTS WITH SVG SOURCES
  // ============================================================================

  try {
    const pictures = document.querySelectorAll('picture')

    for (const picture of pictures) {
      // Check <source> elements
      const sources = picture.querySelectorAll('source')

      for (const source of sources) {
        const type = source.getAttribute('type')
        const srcset = source.getAttribute('srcset')

        if ((type === 'image/svg+xml' || (srcset && isSVGSource(srcset))) && srcset) {
          // srcset can contain multiple URLs with descriptors
          const urls = srcset.split(',').map((s) => s.trim().split(/\s+/)[0])
          for (const url of urls) {
            if (isSVGSource(url)) {
              allSvgData.push(createImageElement(url))
            }
          }
        }
      }
    }
  } catch (error) {
    console.warn('Error finding picture SVGs:', error)
  }

  // ============================================================================
  // 7. SVG FAVICONS IN <link> ELEMENTS
  // ============================================================================

  try {
    const links = document.querySelectorAll('link[rel*="icon"]')

    for (const link of links) {
      const href = link.getAttribute('href')
      const type = link.getAttribute('type')

      if ((type === 'image/svg+xml' || isSVGSource(href)) && href) {
        allSvgData.push(createImageElement(href))
      }
    }
  } catch (error) {
    console.warn('Error finding favicon SVGs:', error)
  }

  // ============================================================================
  // 8. CSS BACKGROUND-IMAGE WITH SVG
  // ============================================================================

  try {
    const allElements = document.querySelectorAll('*')

    for (const element of allElements) {
      try {
        const style = globalThis.getComputedStyle(element)
        const backgroundImage = style.backgroundImage

        if (backgroundImage && backgroundImage !== 'none') {
          const urls = extractURLsFromCSS(backgroundImage)
          for (const url of urls) {
            if (isSVGSource(url)) {
              if (url.startsWith('data:')) {
                const extracted = extractSVGFromDataURI(url)
                if (extracted) {
                  allSvgData.push(extracted)
                } else {
                  allSvgData.push(createImageElement(url))
                }
              } else {
                allSvgData.push(createImageElement(url))
              }
            }
          }
        }
      } catch {
        // Some elements may throw when accessing computed style
      }
    }
  } catch (error) {
    console.warn('Error finding CSS background SVGs:', error)
  }

  // ============================================================================
  // 9. CSS MASK-IMAGE WITH SVG
  // ============================================================================

  try {
    const allElements = document.querySelectorAll('*')

    for (const element of allElements) {
      try {
        const style = globalThis.getComputedStyle(element)
        const maskImage = style.maskImage || style.webkitMaskImage

        if (maskImage && maskImage !== 'none') {
          const urls = extractURLsFromCSS(maskImage)
          for (const url of urls) {
            if (isSVGSource(url)) {
              if (url.startsWith('data:')) {
                const extracted = extractSVGFromDataURI(url)
                if (extracted) {
                  allSvgData.push(extracted)
                }
              } else {
                allSvgData.push(createImageElement(url))
              }
            }
          }
        }
      } catch {
        // Ignore
      }
    }
  } catch (error) {
    console.warn('Error finding CSS mask SVGs:', error)
  }

  // ============================================================================
  // 10. CSS CLIP-PATH WITH SVG
  // ============================================================================

  try {
    const allElements = document.querySelectorAll('*')

    for (const element of allElements) {
      try {
        const style = globalThis.getComputedStyle(element)
        const clipPath = style.clipPath

        if (clipPath && clipPath !== 'none') {
          const urls = extractURLsFromCSS(clipPath)
          for (const url of urls) {
            // clip-path can reference external SVG files or internal IDs
            if (isSVGSource(url) && !url.startsWith('#')) {
              allSvgData.push(createImageElement(url))
            }
          }
        }
      } catch {
        // Ignore
      }
    }
  } catch (error) {
    console.warn('Error finding CSS clip-path SVGs:', error)
  }

  // ============================================================================
  // 11. CSS FILTER WITH SVG
  // ============================================================================

  try {
    const allElements = document.querySelectorAll('*')

    for (const element of allElements) {
      try {
        const style = globalThis.getComputedStyle(element)
        const filter = style.filter

        if (filter && filter !== 'none') {
          const urls = extractURLsFromCSS(filter)
          for (const url of urls) {
            // filter can reference external SVG files or internal IDs
            if (isSVGSource(url) && !url.startsWith('#')) {
              allSvgData.push(createImageElement(url))
            }
          }
        }
      } catch {
        // Ignore
      }
    }
  } catch (error) {
    console.warn('Error finding CSS filter SVGs:', error)
  }

  // ============================================================================
  // 12. CSS BORDER-IMAGE-SOURCE WITH SVG
  // ============================================================================

  try {
    const allElements = document.querySelectorAll('*')

    for (const element of allElements) {
      try {
        const style = globalThis.getComputedStyle(element)
        const borderImageSource = style.borderImageSource

        if (borderImageSource && borderImageSource !== 'none') {
          const urls = extractURLsFromCSS(borderImageSource)
          for (const url of urls) {
            if (isSVGSource(url)) {
              if (url.startsWith('data:')) {
                const extracted = extractSVGFromDataURI(url)
                if (extracted) {
                  allSvgData.push(extracted)
                }
              } else {
                allSvgData.push(createImageElement(url))
              }
            }
          }
        }
      } catch {
        // Ignore
      }
    }
  } catch (error) {
    console.warn('Error finding CSS border-image SVGs:', error)
  }

  // ============================================================================
  // 13. CSS LIST-STYLE-IMAGE WITH SVG
  // ============================================================================

  try {
    const allElements = document.querySelectorAll('*')

    for (const element of allElements) {
      try {
        const style = globalThis.getComputedStyle(element)
        const listStyleImage = style.listStyleImage

        if (listStyleImage && listStyleImage !== 'none') {
          const urls = extractURLsFromCSS(listStyleImage)
          for (const url of urls) {
            if (isSVGSource(url)) {
              if (url.startsWith('data:')) {
                const extracted = extractSVGFromDataURI(url)
                if (extracted) {
                  allSvgData.push(extracted)
                }
              } else {
                allSvgData.push(createImageElement(url))
              }
            }
          }
        }
      } catch {
        // Ignore
      }
    }
  } catch (error) {
    console.warn('Error finding CSS list-style SVGs:', error)
  }

  // ============================================================================
  // 14. CSS CONTENT PROPERTY (pseudo-elements)
  // ============================================================================

  try {
    const allElements = document.querySelectorAll('*')

    for (const element of allElements) {
      // Check ::before
      try {
        const beforeStyle = globalThis.getComputedStyle(element, '::before')
        const beforeContent = beforeStyle.content

        if (beforeContent && beforeContent !== 'none' && beforeContent !== 'normal') {
          const urls = extractURLsFromCSS(beforeContent)
          for (const url of urls) {
            if (isSVGSource(url)) {
              if (url.startsWith('data:')) {
                const extracted = extractSVGFromDataURI(url)
                if (extracted) {
                  allSvgData.push(extracted)
                }
              } else {
                allSvgData.push(createImageElement(url))
              }
            }
          }
        }
      } catch {
        // Ignore
      }

      // Check ::after
      try {
        const afterStyle = globalThis.getComputedStyle(element, '::after')
        const afterContent = afterStyle.content

        if (afterContent && afterContent !== 'none' && afterContent !== 'normal') {
          const urls = extractURLsFromCSS(afterContent)
          for (const url of urls) {
            if (isSVGSource(url)) {
              if (url.startsWith('data:')) {
                const extracted = extractSVGFromDataURI(url)
                if (extracted) {
                  allSvgData.push(extracted)
                }
              } else {
                allSvgData.push(createImageElement(url))
              }
            }
          }
        }
      } catch {
        // Ignore
      }
    }
  } catch (error) {
    console.warn('Error finding CSS content SVGs:', error)
  }

  // ============================================================================
  // 15. CSS CUSTOM PROPERTIES WITH SVG DATA URIS
  // ============================================================================

  try {
    const svgVariablePattern =
      /--[\w-]+\s*:\s*url\(\s*(['"]?)(data:image\/svg\+xml[^'")]+)\1\s*\)/gi

    for (const sheet of document.styleSheets) {
      try {
        const rules = sheet.cssRules || sheet.rules
        if (!rules) continue

        for (const rule of rules) {
          if (!(rule instanceof CSSStyleRule)) continue

          const cssText = rule.cssText
          let match

          while ((match = svgVariablePattern.exec(cssText)) !== null) {
            const dataUri = match[2]
            const extracted = extractSVGFromDataURI(dataUri)
            if (extracted) {
              allSvgData.push(extracted)
            }
          }
        }
      } catch {
        // Cross-origin stylesheet, skip
      }
    }
  } catch (error) {
    console.warn('Error finding CSS custom property SVGs:', error)
  }

  // ============================================================================
  // 16. SHADOW DOM SVGs (open mode only)
  // ============================================================================

  const findShadowDOMSVGs = (root: Element | ShadowRoot): void => {
    try {
      const elements = root.querySelectorAll('*')

      for (const element of elements) {
        const shadowRoot = element.shadowRoot
        if (!shadowRoot) continue

        // Find inline SVGs in shadow root
        findInlineSVGs(shadowRoot)

        // Also check for SVG images/objects/etc in shadow root
        const shadowImages = shadowRoot.querySelectorAll('img')
        for (const img of shadowImages) {
          if (isSVGSource(img.src)) {
            if (img.src.startsWith('data:')) {
              const extracted = extractSVGFromDataURI(img.src)
              if (extracted) {
                allSvgData.push(extracted)
              } else {
                allSvgData.push(createImageElement(img.src))
              }
            } else {
              allSvgData.push(createImageElement(img.src))
            }
          }
        }

        // Recursively search nested shadow roots
        findShadowDOMSVGs(shadowRoot)
      }
    } catch (error) {
      console.warn('Error finding Shadow DOM SVGs:', error)
    }
  }

  findShadowDOMSVGs(document.body)

  // ============================================================================
  // 17. <template> ELEMENTS CONTAINING SVGs
  // ============================================================================

  try {
    const templates = document.querySelectorAll('template')

    for (const template of templates) {
      const content = template.content

      // Find inline SVGs in template
      const svgs = content.querySelectorAll('svg')
      for (const svg of svgs) {
        allSvgData.push(serializeSVG(svg as SVGElement))
      }

      // Find SVG images in template
      const images = content.querySelectorAll('img')
      for (const img of images) {
        if (isSVGSource(img.src)) {
          if (img.src.startsWith('data:')) {
            const extracted = extractSVGFromDataURI(img.src)
            if (extracted) {
              allSvgData.push(extracted)
            }
          } else {
            allSvgData.push(createImageElement(img.src))
          }
        }
      }
    }
  } catch (error) {
    console.warn('Error finding template SVGs:', error)
  }

  // ============================================================================
  // 18. EXTERNAL <use> REFERENCES TO SVG SPRITES
  // ============================================================================

  try {
    const useElements = document.querySelectorAll('use')

    for (const use of useElements) {
      const href = use.getAttribute('href') || use.getAttribute('xlink:href')
      if (!href) continue

      // Skip internal references (they're part of inline SVGs)
      if (href.startsWith('#')) continue

      // External reference like "sprites.svg#icon-name"
      if (isSVGSource(href)) {
        allSvgData.push(createImageElement(href))
      }
    }
  } catch (error) {
    console.warn('Error finding use reference SVGs:', error)
  }

  // ============================================================================
  // 19. <image> ELEMENTS WITHIN SVGs THAT REFERENCE OTHER SVGs
  // ============================================================================

  try {
    // Note: SVG <image> is different from HTML <img>
    const svgImages = document.querySelectorAll('svg image')

    for (const image of svgImages) {
      const href = image.getAttribute('href') || image.getAttribute('xlink:href')
      if (!href || !isSVGSource(href)) continue

      if (href.startsWith('data:')) {
        const extracted = extractSVGFromDataURI(href)
        if (extracted) {
          allSvgData.push(extracted)
        }
      } else {
        allSvgData.push(createImageElement(href))
      }
    }
  } catch (error) {
    console.warn('Error finding nested SVG image elements:', error)
  }

  // ============================================================================
  // 20. INLINE STYLES WITH SVG DATA URIS
  // ============================================================================

  try {
    const allElements = document.querySelectorAll('*')

    for (const element of allElements) {
      const inlineStyle = element.getAttribute('style')
      if (!inlineStyle) continue

      // Check if inline style contains SVG data URI
      if (inlineStyle.includes('data:image/svg+xml')) {
        const urls = extractURLsFromCSS(inlineStyle)
        for (const url of urls) {
          if (url.startsWith('data:image/svg+xml')) {
            const extracted = extractSVGFromDataURI(url)
            if (extracted) {
              allSvgData.push(extracted)
            }
          }
        }
      }
    }
  } catch (error) {
    console.warn('Error finding inline style SVGs:', error)
  }

  // ============================================================================
  // 21. SVG CONTENT IN STYLE TAGS
  // ============================================================================

  try {
    const styleTags = document.querySelectorAll('style')

    for (const style of styleTags) {
      const cssText = style.textContent || ''

      // Look for data URIs in CSS
      if (cssText.includes('data:image/svg+xml')) {
        const urls = extractURLsFromCSS(cssText)
        for (const url of urls) {
          if (url.startsWith('data:image/svg+xml')) {
            const extracted = extractSVGFromDataURI(url)
            if (extracted) {
              allSvgData.push(extracted)
            }
          }
        }
      }
    }
  } catch (error) {
    console.warn('Error finding style tag SVGs:', error)
  }

  // ============================================================================
  // DEDUPLICATE AND FORMAT RESULTS
  // ============================================================================

  const uniqueSvgData = [...new Set(allSvgData)].filter((svg) => svg && svg.trim().length > 0)

  /**
   * Generate a best-attempt name for an SVG
   */
  const bestAttemptAtName = (svg: string, index: number): string => {
    // Try to infer a name from a .svg filename
    const fileMatch = svg.match(/\/([^/"']+)\.svg/i)
    if (fileMatch?.[1]) {
      return fileMatch[1]
    }

    // Try to infer name from an id attribute
    const idMatch = svg.match(/id=["']([^"']+)["']/i)
    if (idMatch?.[1]) {
      return idMatch[1]
    }

    // Try to infer name from a title element
    const titleMatch = svg.match(/<title>([^<]+)<\/title>/i)
    if (titleMatch?.[1]) {
      return titleMatch[1].trim()
    }

    // Try to infer name from aria-label
    const ariaMatch = svg.match(/aria-label=["']([^"']+)["']/i)
    if (ariaMatch?.[1]) {
      return ariaMatch[1].trim()
    }

    // Fallback to deterministic name based on host + index
    const host = location?.host || 'unknown'
    return `${host}-${index + 1}`
  }

  return {
    data: uniqueSvgData.map((svg, index) => {
      try {
        return {
          corsRestricted: false,
          id: crypto.randomUUID(),
          lastEdited: new Date().toISOString(),
          name: bestAttemptAtName(svg, index),
          svg,
        }
      } catch (error) {
        console.warn('Error creating SVG data object:', error)
        return {
          corsRestricted: false,
          id: `svg-fallback-${index}`,
          lastEdited: new Date().toISOString(),
          name: `unknown-${index}`,
          svg,
        }
      }
    }),
    host: location?.host || '',
    href: location?.href || '',
    origin: location?.origin || '',
  }
}
