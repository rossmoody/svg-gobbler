import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { ShadowSvg } from './shadow-svg'

const hostile = `<svg xmlns="http://www.w3.org/2000/svg"><style>.cls-1{fill:red} body{display:none}</style><linearGradient id="a"/><path class="cls-1" fill="url(#a)" d="M0 0"/></svg>`
const other = `<svg xmlns="http://www.w3.org/2000/svg"><linearGradient id="a"/><path class="cls-1" fill="url(#a)" d="M1 1"/></svg>`

afterEach(cleanup)

describe('ShadowSvg', () => {
  it('renders the markup inside a shadow root', () => {
    const { container } = render(<ShadowSvg markup={hostile} />)
    const host = container.firstElementChild!

    expect(host.tagName).toBe('SPAN')
    expect(host.shadowRoot?.querySelector('svg path')?.getAttribute('d')).toBe('M0 0')
  })

  it('keeps scraped styles and ids out of the app document', () => {
    render(
      <>
        <ShadowSvg markup={hostile} />
        <ShadowSvg markup={other} />
      </>,
    )

    expect(document.querySelector('svg')).toBeNull()
    expect(document.querySelector('style')).toBeNull()
    expect(document.querySelector('#a')).toBeNull()
    expect([...document.styleSheets]).toHaveLength(0)
  })

  it('gives each svg its own id scope', () => {
    const { container } = render(
      <>
        <ShadowSvg markup={hostile} />
        <ShadowSvg markup={other} />
      </>,
    )
    const [first, second] = [...container.children].map((host) => host.shadowRoot!)

    expect(first.querySelectorAll('#a')).toHaveLength(1)
    expect(second.querySelectorAll('#a')).toHaveLength(1)
    expect(first.querySelector('#a')).not.toBe(second.querySelector('#a'))
  })

  it('applies caller css inside the root and updates when the markup changes', () => {
    const { container, rerender } = render(
      <ShadowSvg as="div" className="host" css="svg{margin:auto}" markup={hostile} />,
    )
    const host = container.firstElementChild!

    expect(host.tagName).toBe('DIV')
    expect(host.className).toBe('host')
    expect(host.shadowRoot?.querySelector('style')?.textContent).toContain('svg{margin:auto}')

    rerender(<ShadowSvg as="div" className="host" css="svg{margin:auto}" markup={other} />)

    expect(host.shadowRoot?.querySelectorAll('svg')).toHaveLength(1)
    expect(host.shadowRoot?.querySelector('svg path')?.getAttribute('d')).toBe('M1 1')
  })
})
