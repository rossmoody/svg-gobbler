import { describe, expect, it, vi } from 'vitest'

import type { DocumentData, StorageSvg } from './types'

import { svgFactory } from './svg-factory'

const NS = 'xmlns="http://www.w3.org/2000/svg"'

const item = (svg: string, overrides: Partial<StorageSvg> = {}): StorageSvg => ({
  corsRestricted: false,
  id: crypto.randomUUID(),
  lastEdited: '2026-01-01T00:00:00.000Z',
  name: 'test',
  svg,
  ...overrides,
})

const page = (...data: StorageSvg[]): DocumentData => ({
  data,
  host: 'example.com',
  href: 'https://example.com/page',
  origin: 'https://example.com',
})

describe('svgFactory.process', () => {
  it('returns nothing for a missing message', async () => {
    // eslint-disable-next-line unicorn/no-null
    expect(await svgFactory.process(null)).toEqual([])
  })

  it('builds inline svgs and derives a viewBox from width and height', async () => {
    const [svg] = await svgFactory.process(
      page(item(`<svg ${NS} width="24px" height="12"><path d="M0 0"/></svg>`)),
    )

    expect(svg.svgType).toBe('Inline')
    expect(svg.isValid).toBe(true)
    expect(svg.asElement?.getAttribute('viewBox')).toBe('0 0 24 12')
  })

  it('wraps symbols in an svg that uses them', async () => {
    const [svg] = await svgFactory.process(
      page(item(`<symbol ${NS} viewBox="0 0 8 8"><path d="M0 0"/></symbol>`)),
    )

    expect(svg.svgType).toBe('SvgSymbol')
    expect(svg.asElement?.tagName).toBe('svg')
    expect(svg.asElement?.getAttribute('viewBox')).toBe('0 0 8 8')

    const id = svg.asElement?.querySelector('symbol')?.getAttribute('id')
    expect(svg.asElement?.querySelector('use')?.getAttribute('href')).toBe(`#${id}`)
  })

  it('drops markup that is not an svg, symbol, g, or img', async () => {
    const result = await svgFactory.process(page(item('<div>nope</div>'), item('not markup')))

    expect(result).toEqual([])
  })

  it('strips presentation attributes without touching the stored string', async () => {
    const source = `<svg ${NS} viewBox="0 0 1 1" width="10" height="10" class="icon" style="color:red"><path d="M0 0"/></svg>`
    const [svg] = await svgFactory.process(page(item(source)))

    expect(svg.presentationSvg).not.toMatch(/width=|height=|class=|style=/)
    expect(svg.presentationSvg).toContain('viewBox="0 0 1 1"')
    expect(svg.svg).toBe(source)
  })

  describe('images', () => {
    const remote = `<svg ${NS} viewBox="0 0 2 2"><path d="M1 1"/></svg>`

    it('decodes base64 data uris without touching the network', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch')
      const [svg] = await svgFactory.process(
        page(item(`<img src="data:image/svg+xml;base64,${btoa(remote)}"/>`)),
      )

      expect(svg.svgType).toBe('Image')
      expect(svg.corsRestricted).toBe(false)
      expect(svg.asElement?.tagName).toBe('svg')
      expect(fetchSpy).not.toHaveBeenCalled()
    })

    it('fetches relative sources against the page origin', async () => {
      const fetchSpy = vi
        .spyOn(globalThis, 'fetch')
        .mockResolvedValue(new Response(remote, { status: 200 }))

      const [svg] = await svgFactory.process(page(item('<img src="/icons/a.svg"/>')))

      expect(fetchSpy.mock.calls[0][0]).toBe('https://example.com/icons/a.svg')
      expect(svg.corsRestricted).toBe(false)
      expect(svg.svg).toContain('<path d="M1 1"')
    })

    it.each([
      ['a rejected request', () => Promise.reject(new TypeError('Failed to fetch'))],
      ['an error status', () => Promise.resolve(new Response('', { status: 403 }))],
    ])('keeps the image but marks it cors restricted after %s', async (_, respond) => {
      vi.spyOn(globalThis, 'fetch').mockImplementation(respond)

      const [svg] = await svgFactory.process(
        page(item('<img src="https://cdn.example.org/a.svg"/>')),
      )

      expect(svg.svgType).toBe('Image')
      expect(svg.corsRestricted).toBe(true)
    })

    it('does not refetch images already known to be cors restricted', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch')

      await svgFactory.process(
        page(item('<img src="https://cdn.example.org/a.svg"/>', { corsRestricted: true })),
      )

      expect(fetchSpy).not.toHaveBeenCalled()
    })
  })
})
