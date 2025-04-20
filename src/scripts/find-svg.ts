import type { DocumentData } from './types'

/**
 * Gathers all relevant SVG data from a given document. Must be isolated self-containing
 * function to make Chrome Manifest V3 security happy.
 */
export async function findSvg(documentParameter?: Document): Promise<DocumentData> {
  /**
   * The document to search for SVGs. Defaults to window.document.
   */
  const document = documentParameter ?? globalThis.document
  const location = document.location

  /**
   * Helper function to safely create a new image element with the provided source.
   * This strips out sensitive data due to security restrictions on client page access.
   * Centralizes handling of async srcs, base64 srcs, and data URLs.
   */
  const createImage = (source: string): string => {
    try {
      const image = new Image()
      image.src = source
      return image.outerHTML
    } catch (error) {
      console.warn(`Failed to create image from source: ${source}`, error)
      return ''
    }
  }

  /**
   * Checks if a string is related to SVG content.
   * This includes various formats like data URIs, XML namespaces, and inline SVG.
   */
  const isSvgRelated = (string_: string): boolean => {
    if (!string_) return false

    return (
      string_.includes('.svg') ||
      string_.includes('data:image/svg+xml') ||
      string_.includes('image/svg+xml') ||
      // Check for inline SVG in data URIs
      (string_.includes('data:') && string_.includes('<svg')) ||
      // Check for SVG XML namespace
      string_.includes('http://www.w3.org/2000/svg') ||
      // Check for SVG elements
      /<(?:svg|path|circle|rect|g)\s/i.test(string_) ||
      // Check for viewBox attribute
      /viewBox\s*=\s*["']/i.test(string_)
    )
  }

  /**
   * Find all the elements with src or background images that contain svg
   */
  const parseSourceAndBgImages = (): string[] => {
    const results: string[] = []

    try {
      // Use specific selectors for better performance
      const imageElements = document.querySelectorAll(
        'img[src*=".svg"], img[src*="data:image/svg+xml"]',
      )
      const objectElements = document.querySelectorAll('object[type="image/svg+xml"]')
      const embedElements = document.querySelectorAll(
        'embed[type="image/svg+xml"], embed[src*=".svg"]',
      )
      const iframeElements = document.querySelectorAll('iframe[src*=".svg"]')

      // Process image elements
      for (const element of imageElements) {
        if (element instanceof HTMLImageElement && isSvgRelated(element.src)) {
          results.push(createImage(element.src))
        }
      }

      // Process object elements
      for (const element of objectElements) {
        if (element instanceof HTMLObjectElement) {
          results.push(createImage(element.data))
        }
      }

      // Process embed elements
      for (const element of embedElements) {
        if (element instanceof HTMLEmbedElement) {
          results.push(createImage(element.src))
        }
      }

      // Process iframe elements
      for (const element of iframeElements) {
        if (element instanceof HTMLIFrameElement) {
          results.push(createImage(element.src))
        }
      }

      // Check for elements with background images
      const allElements = document.querySelectorAll('*')
      for (const element of allElements) {
        if (element instanceof HTMLElement) {
          try {
            const backgroundImage = globalThis.getComputedStyle(element).backgroundImage
            if (backgroundImage && isSvgRelated(backgroundImage)) {
              // Extract URL from the background-image CSS property
              const match = backgroundImage.match(/url\(['"]?([^'"()]+)['"]?\)/)
              if (match && match[1]) {
                results.push(createImage(match[1]))
              }
            }
          } catch (error) {
            // Some elements might throw errors when accessing computed style
            console.warn('Error accessing background image:', error)
          }
        }
      }
    } catch (error) {
      console.warn('Error processing elements for SVG content:', error)
    }

    return results.filter(Boolean)
  }

  /**
   * Gathers inline SVG elements, filtering out those with use/symbol references
   * as they're handled separately
   */
  const gatherInlineSvgElements = (): string[] => {
    try {
      return [...document.querySelectorAll('svg')]
        .filter((svg) => !svg.querySelector('use, symbol'))
        .map((svg) => svg.outerHTML)
        .filter(Boolean)
    } catch (error) {
      console.warn('Error gathering inline SVG elements:', error)
      return []
    }
  }

  /**
   * Gathers all g elements (SVG groups)
   */
  const gatherGElements = (): string[] => {
    try {
      return [...document.querySelectorAll('g')].map((g) => g.outerHTML).filter(Boolean)
    } catch (error) {
      console.warn('Error gathering G elements:', error)
      return []
    }
  }

  /**
   * Gathers all symbol elements (SVG symbols)
   */
  const gatherSymbolElements = (): string[] => {
    try {
      return [...document.querySelectorAll('symbol')]
        .map((symbol) => symbol.outerHTML)
        .filter(Boolean)
    } catch (error) {
      console.warn('Error gathering symbol elements:', error)
      return []
    }
  }

  /**
   * Gathers use elements that reference external SVG sprites
   */
  const gatherUseElements = (): string[] => {
    const results: string[] = []

    try {
      const elements = document.querySelectorAll('use')

      for (const element of elements) {
        // Check href attribute (modern standard)
        const href = element.getAttribute('href')
        if (href && isSvgRelated(href)) {
          results.push(createImage(href))
        }

        // Check xlink:href attribute (older standard, but still widely used)
        const xLinkHref = element.getAttribute('xlink:href')
        if (xLinkHref && isSvgRelated(xLinkHref)) {
          results.push(createImage(xLinkHref))
        }
      }
    } catch (error) {
      console.warn('Error gathering use elements:', error)
    }

    return results.filter(Boolean)
  }

  /**
   * Improved Shadow DOM SVG gathering with nested shadow roots support
   */
  const gatherShadowDomSvgs = (): string[] => {
    const results: string[] = []

    try {
      const elements = document.querySelectorAll('*')

      const processNode = (element: Element) => {
        const shadowRoot = element.shadowRoot
        if (shadowRoot) {
          for (const svg of shadowRoot.querySelectorAll('svg')) {
            results.push(svg.outerHTML)
          }

          // Also check for SVG images, objects, etc. inside shadow DOM
          for (const element_ of shadowRoot.querySelectorAll(
            'img[src*=".svg"], object[type="image/svg+xml"]',
          )) {
            if (element_ instanceof HTMLImageElement) {
              results.push(createImage(element_.src))
            } else if (element_ instanceof HTMLObjectElement) {
              results.push(createImage(element_.data))
            }
          }

          // Process nested shadow roots recursively
          for (const child of shadowRoot.querySelectorAll('*')) {
            processNode(child)
          }
        }
      }

      for (const element of elements) {
        processNode(element)
      }
    } catch (error) {
      console.warn('Error gathering SVGs from Shadow DOM:', error)
    }

    return results.filter(Boolean)
  }

  /**
   * Gathers SVGs from CSS custom properties
   */
  const gatherCssCustomPropertySvgs = (): string[] => {
    const results: string[] = []

    try {
      // Check all style sheets
      for (const sheet of document.styleSheets) {
        try {
          // Access might be blocked due to CORS
          const rules = [...(sheet.cssRules || [])]

          for (const rule of rules) {
            if (rule instanceof CSSStyleRule) {
              // Look for CSS custom properties with SVG content
              const style = rule.style
              for (let index = 0; index < style.length; index++) {
                const property = style[index]
                if (property.startsWith('--')) {
                  const value = style.getPropertyValue(property)
                  if (isSvgRelated(value)) {
                    // Extract SVG URL
                    const match = value.match(/url\(['"]?([^'"()]+)['"]?\)/)
                    if (match && match[1]) {
                      results.push(createImage(match[1]))
                    }
                  }
                }
              }
            }
          }
        } catch (error) {
          // CORS restrictions might prevent access to some stylesheets
          console.warn('Could not access stylesheet due to CORS:', error)
        }
      }
    } catch (error) {
      console.warn('Error gathering SVGs from CSS custom properties:', error)
    }

    return results.filter(Boolean)
  }

  /**
   * Gathers SVGs from Web Components
   */
  const gatherWebComponentSvgs = (): string[] => {
    const results: string[] = []

    try {
      const customElements = [...document.querySelectorAll('*')].filter((element) =>
        element.tagName.includes('-'),
      ) // Custom elements contain a hyphen

      for (const element of customElements) {
        const slots = element.querySelectorAll('slot')
        for (const slot of slots) {
          const assignedNodes = slot.assignedNodes()
          for (const node of assignedNodes) {
            if (node instanceof SVGElement) {
              results.push(node.outerHTML)
            }
          }
        }
      }
    } catch (error) {
      console.warn('Error gathering SVGs from Web Components:', error)
    }

    return results.filter(Boolean)
  }

  /**
   * Gathers SVGs from CSS content property
   */
  const gatherCssContentSvgs = (): string[] => {
    const results: string[] = []

    try {
      // Get all elements
      const elements = document.querySelectorAll('*')

      for (const element of elements) {
        try {
          const style = globalThis.getComputedStyle(element)
          const content = style.getPropertyValue('content')

          if (
            content &&
            isSvgRelated(content) && // Extract SVG content from CSS content property
            content.includes('url(')
          ) {
            const match = content.match(/url\(['"]?([^'"()]+)['"]?\)/)
            if (match && match[1]) {
              results.push(createImage(match[1]))
            }
          }
        } catch (error) {
          // Some elements might throw errors when accessing computed style
          console.warn('Error accessing CSS content property:', error)
        }
      }
    } catch (error) {
      console.warn('Error gathering SVGs from CSS content property:', error)
    }

    return results.filter(Boolean)
  }

  /**
   * Gathers SVGs from HTML templates
   */
  const gatherTemplateSvgs = (): string[] => {
    const results: string[] = []

    try {
      // Check <template> elements
      for (const template of document.querySelectorAll('template')) {
        const content = template.content

        // Find SVGs in the template content
        for (const svg of content.querySelectorAll('svg')) {
          results.push(svg.outerHTML)
        }

        // Find SVG images, objects, etc.
        for (const element of content.querySelectorAll(
          'img[src*=".svg"], object[type="image/svg+xml"]',
        )) {
          if (element instanceof HTMLImageElement) {
            results.push(createImage(element.src))
          } else if (element instanceof HTMLObjectElement) {
            results.push(createImage(element.data))
          }
        }
      }
    } catch (error) {
      console.warn('Error gathering SVGs from HTML templates:', error)
    }

    return results.filter(Boolean)
  }

  /**
   * Parses CSS sprite sheets for SVGs
   */
  const parseCssSpriteSheets = (): string[] => {
    const results: string[] = []

    try {
      // Look for elements using sprite sheets via background-position
      const elements = document.querySelectorAll('[class*="icon"], [class*="sprite"]')

      for (const element of elements) {
        try {
          const style = globalThis.getComputedStyle(element)
          const backgroundImage = style.backgroundImage
          const backgroundPosition = style.backgroundPosition

          // If there's a background image and position, it might be a sprite
          if (backgroundImage && backgroundPosition && isSvgRelated(backgroundImage)) {
            const match = backgroundImage.match(/url\(['"]?([^'"()]+)['"]?\)/)
            if (match && match[1]) {
              results.push(createImage(match[1]))
            }
          }
        } catch (error) {
          console.warn('Error accessing sprite sheet styles:', error)
        }
      }
    } catch (error) {
      console.warn('Error parsing CSS sprite sheets:', error)
    }

    return results.filter(Boolean)
  }

  /**
   * Gathers SVGs from <picture> elements
   */
  const gatherPictureElementSvgs = (): string[] => {
    const results: string[] = []

    try {
      // Find all picture elements
      for (const picture of document.querySelectorAll('picture')) {
        // Check source elements with SVG type
        for (const source of picture.querySelectorAll('source[type="image/svg+xml"]')) {
          const srcset = source.getAttribute('srcset')
          if (srcset) {
            // Handle multiple sources in srcset
            for (const source_ of srcset.split(',')) {
              const trimmedSource = source_.trim().split(' ')[0] // Remove size descriptors
              results.push(createImage(trimmedSource))
            }
          }
        }

        // Check if the fallback img is SVG
        const img = picture.querySelector('img')
        if (img && isSvgRelated(img.src)) {
          results.push(createImage(img.src))
        }
      }
    } catch (error) {
      console.warn('Error gathering SVGs from picture elements:', error)
    }

    return results.filter(Boolean)
  }

  // Gather all SVG data from various sources
  const allSvgData = [
    ...parseSourceAndBgImages(),
    ...gatherInlineSvgElements(),
    ...gatherGElements(),
    ...gatherSymbolElements(),
    ...gatherUseElements(),
    ...gatherShadowDomSvgs(),
    ...gatherCssCustomPropertySvgs(),
    ...gatherWebComponentSvgs(),
    ...gatherCssContentSvgs(),
    ...gatherTemplateSvgs(),
    ...parseCssSpriteSheets(),
    ...gatherPictureElementSvgs(),
  ]

  const uniqueSvgData = [...new Set(allSvgData)].filter((svg) => svg.trim().length > 0)

  return {
    data: uniqueSvgData.map((svg, index) => {
      try {
        return {
          corsRestricted: false,
          id: crypto.randomUUID(),
          lastEdited: new Date().toISOString(),
          name: `${location?.host}-${index}`,
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
