import type { DocumentData } from './types'

/**
 * Gathers all relevant SVG data from a given document. Must be isolated self-containing
 * function to make Chrome Manifest V3 security happy.
 */
export async function findSvg(documentParam?: Document): Promise<DocumentData> {
  /**
   * The document to search for SVGs. Defaults to window.document.
   */
  const document = documentParam ?? window.document
  const location = document.location

  /**
   * Helper function to safely create a new image element with the provided source.
   * This strips out sensitive data due to security restrictions on client page access.
   * Centralizes handling of async srcs, base64 srcs, and data URLs.
   */
  const createImage = (src: string): string => {
    try {
      const image = new Image()
      image.src = src
      return image.outerHTML
    } catch (error) {
      console.warn(`Failed to create image from source: ${src}`, error)
      return ''
    }
  }

  /**
   * Checks if a string is related to SVG content.
   * This includes various formats like data URIs, XML namespaces, and inline SVG.
   */
  const isSvgRelated = (str: string): boolean => {
    if (!str) return false

    return (
      str.includes('.svg') ||
      str.includes('data:image/svg+xml') ||
      str.includes('image/svg+xml') ||
      // Check for inline SVG in data URIs
      (str.includes('data:') && str.includes('<svg')) ||
      // Check for SVG XML namespace
      str.includes('http://www.w3.org/2000/svg') ||
      // Check for SVG elements
      /<(?:svg|path|circle|rect|g)\s/i.test(str) ||
      // Check for viewBox attribute
      /viewBox\s*=\s*["']/i.test(str)
    )
  }

  /**
   * Find all the elements with src or background images that contain svg
   */
  const parseSrcAndBgImages = (): string[] => {
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
      imageElements.forEach((element) => {
        if (element instanceof HTMLImageElement && isSvgRelated(element.src)) {
          results.push(createImage(element.src))
        }
      })

      // Process object elements
      objectElements.forEach((element) => {
        if (element instanceof HTMLObjectElement) {
          results.push(createImage(element.data))
        }
      })

      // Process embed elements
      embedElements.forEach((element) => {
        if (element instanceof HTMLEmbedElement) {
          results.push(createImage(element.src))
        }
      })

      // Process iframe elements
      iframeElements.forEach((element) => {
        if (element instanceof HTMLIFrameElement) {
          results.push(createImage(element.src))
        }
      })

      // Check for elements with background images
      const allElements = document.querySelectorAll('*')
      allElements.forEach((element) => {
        if (element instanceof HTMLElement) {
          try {
            const backgroundImage = window.getComputedStyle(element).backgroundImage
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
      })
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
      return Array.from(document.querySelectorAll('svg'))
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
      return Array.from(document.querySelectorAll('g'))
        .map((g) => g.outerHTML)
        .filter(Boolean)
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
      return Array.from(document.querySelectorAll('symbol'))
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

      elements.forEach((element) => {
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
      })
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
          shadowRoot.querySelectorAll('svg').forEach((svg) => {
            results.push(svg.outerHTML)
          })

          // Also check for SVG images, objects, etc. inside shadow DOM
          shadowRoot
            .querySelectorAll('img[src*=".svg"], object[type="image/svg+xml"]')
            .forEach((el) => {
              if (el instanceof HTMLImageElement) {
                results.push(createImage(el.src))
              } else if (el instanceof HTMLObjectElement) {
                results.push(createImage(el.data))
              }
            })

          // Process nested shadow roots recursively
          shadowRoot.querySelectorAll('*').forEach((child) => {
            processNode(child)
          })
        }
      }

      elements.forEach((element) => {
        processNode(element)
      })
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
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          // Access might be blocked due to CORS
          const rules = Array.from(sheet.cssRules || [])

          for (const rule of rules) {
            if (rule instanceof CSSStyleRule) {
              // Look for CSS custom properties with SVG content
              const style = rule.style
              for (let i = 0; i < style.length; i++) {
                const prop = style[i]
                if (prop.startsWith('--')) {
                  const value = style.getPropertyValue(prop)
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
        } catch (e) {
          // CORS restrictions might prevent access to some stylesheets
          console.warn('Could not access stylesheet due to CORS:', e)
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
      const customElements = Array.from(document.querySelectorAll('*')).filter((el) =>
        el.tagName.includes('-'),
      ) // Custom elements contain a hyphen

      customElements.forEach((element) => {
        const slots = element.querySelectorAll('slot')
        slots.forEach((slot) => {
          const assignedNodes = slot.assignedNodes()
          assignedNodes.forEach((node) => {
            if (node instanceof SVGElement) {
              results.push(node.outerHTML)
            }
          })
        })
      })
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

      elements.forEach((element) => {
        try {
          const style = window.getComputedStyle(element)
          const content = style.getPropertyValue('content')

          if (content && isSvgRelated(content)) {
            // Extract SVG content from CSS content property
            if (content.includes('url(')) {
              const match = content.match(/url\(['"]?([^'"()]+)['"]?\)/)
              if (match && match[1]) {
                results.push(createImage(match[1]))
              }
            }
          }
        } catch (error) {
          // Some elements might throw errors when accessing computed style
          console.warn('Error accessing CSS content property:', error)
        }
      })
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
      document.querySelectorAll('template').forEach((template) => {
        const content = template.content

        // Find SVGs in the template content
        content.querySelectorAll('svg').forEach((svg) => {
          results.push(svg.outerHTML)
        })

        // Find SVG images, objects, etc.
        content.querySelectorAll('img[src*=".svg"], object[type="image/svg+xml"]').forEach((el) => {
          if (el instanceof HTMLImageElement) {
            results.push(createImage(el.src))
          } else if (el instanceof HTMLObjectElement) {
            results.push(createImage(el.data))
          }
        })
      })
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

      elements.forEach((element) => {
        try {
          const style = window.getComputedStyle(element)
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
      })
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
      document.querySelectorAll('picture').forEach((picture) => {
        // Check source elements with SVG type
        picture.querySelectorAll('source[type="image/svg+xml"]').forEach((source) => {
          const srcset = source.getAttribute('srcset')
          if (srcset) {
            // Handle multiple sources in srcset
            srcset.split(',').forEach((src) => {
              const trimmedSrc = src.trim().split(' ')[0] // Remove size descriptors
              results.push(createImage(trimmedSrc))
            })
          }
        })

        // Check if the fallback img is SVG
        const img = picture.querySelector('img')
        if (img && isSvgRelated(img.src)) {
          results.push(createImage(img.src))
        }
      })
    } catch (error) {
      console.warn('Error gathering SVGs from picture elements:', error)
    }

    return results.filter(Boolean)
  }

  // Gather all SVG data from various sources
  const allSvgData = [
    ...parseSrcAndBgImages(),
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
    data: uniqueSvgData.map((svg, i) => {
      try {
        return {
          corsRestricted: false,
          id: crypto.randomUUID?.() || `svg-${Date.now()}-${i}`,
          lastEdited: new Date().toISOString(),
          name: `${location?.host || 'unknown'}-${i}`,
          svg,
        }
      } catch (error) {
        console.warn('Error creating SVG data object:', error)
        return {
          corsRestricted: false,
          id: `svg-fallback-${i}`,
          lastEdited: new Date().toISOString(),
          name: `unknown-${i}`,
          svg,
        }
      }
    }),
    host: location?.host || '',
    href: location?.href || '',
    origin: location?.origin || '',
  }
}
