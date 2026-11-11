import { createElement, HTMLAttributes, useLayoutEffect, useRef } from 'react'

/**
 * Mirrors the Tailwind preflight rules that applied to SVGs when they were
 * rendered in the light DOM, so isolating them doesn't change their layout.
 */
const BASE_CSS = 'svg{display:block;vertical-align:middle}'

export type ShadowSvgProperties = HTMLAttributes<HTMLElement> & {
  /**
   * The host element to render. Defaults to a span.
   */
  as?: 'div' | 'span'
  /**
   * Extra CSS for the SVG. Page styles don't reach into the shadow root, so
   * anything that styles the SVG itself has to be passed here.
   */
  css?: string
  /**
   * The untrusted SVG markup to render.
   */
  markup: string
}

/**
 * Renders SVG markup from an arbitrary website inside a shadow root.
 *
 * Injecting it straight into the page lets a <style> block in one SVG restyle
 * every other SVG (and the app), and makes duplicate ids such as gradients and
 * clip paths resolve to whichever SVG happens to come first in the document.
 * A shadow root scopes both styles and ids to the single SVG, while inherited
 * properties like `color` still flow in so `currentColor` keeps working.
 */
export const ShadowSvg = ({ as = 'span', css = '', markup, ...rest }: ShadowSvgProperties) => {
  const reference = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const host = reference.current
    if (!host) return

    const root = host.shadowRoot ?? host.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = BASE_CSS + css
    root.innerHTML = markup
    root.prepend(style)
  }, [css, markup])

  return createElement(as, { ...rest, ref: reference })
}
