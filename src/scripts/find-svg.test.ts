import { beforeEach, describe, expect, it } from 'vitest'

import { findSvg } from './find-svg'

const SVG_NS = 'xmlns="http://www.w3.org/2000/svg"'
const circle = `<svg ${SVG_NS} viewBox="0 0 10 10"><circle r="5"/></svg>`
const rect = `<svg ${SVG_NS} viewBox="0 0 10 10"><rect width="10" height="10"/></svg>`
const base64Uri = `data:image/svg+xml;base64,${btoa(circle)}`
const encodedUri = `data:image/svg+xml,${encodeURIComponent(rect)}`

const gobble = async (html: string, head = '') => {
  document.head.innerHTML = head
  document.body.innerHTML = html
  const result = await findSvg()
  return result.data.map((item) => item.svg)
}

describe('findSvg', () => {
  beforeEach(() => {
    document.head.innerHTML = ''
    document.body.innerHTML = ''
  })

  it('returns the page location alongside the data', async () => {
    document.body.innerHTML = '<svg><path d="M0 0"/></svg>'
    const result = await findSvg()

    expect(result.host).toBe(location.host)
    expect(result.href).toBe(location.href)
    expect(result.origin).toBe(location.origin)
    expect(result.data[0]).toMatchObject({ corsRestricted: false })
    expect(result.data[0].id).toBeTruthy()
  })

  describe('inline', () => {
    it('finds inline svgs and adds a missing xmlns', async () => {
      const svgs = await gobble('<svg viewBox="0 0 1 1"><path d="M0 0"/></svg>')

      expect(svgs).toHaveLength(1)
      expect(svgs[0]).toContain('xmlns="http://www.w3.org/2000/svg"')
      expect(svgs[0]).toContain('<path d="M0 0"/>')
    })

    it('captures nested svgs only through their parent', async () => {
      const svgs = await gobble('<svg id="outer"><svg id="inner"><path d="M0 0"/></svg></svg>')

      expect(svgs).toHaveLength(1)
      expect(svgs[0]).toContain('id="outer"')
    })

    it('removes exact duplicates', async () => {
      const svgs = await gobble(`${circle}${circle}${rect}`)

      expect(svgs).toHaveLength(2)
    })

    it('finds svgs in open shadow roots', async () => {
      document.body.innerHTML = '<div id="host"></div>'
      const root = document.querySelector('#host')!.attachShadow({ mode: 'open' })
      root.innerHTML = '<svg id="in-shadow"><path d="M0 0"/></svg>'

      const result = await findSvg()

      expect(result.data.map((item) => item.svg).join('')).toContain('id="in-shadow"')
    })

    it('finds svgs inside template elements', async () => {
      const svgs = await gobble('<template><svg id="in-template"><path d="M0 0"/></svg></template>')

      expect(svgs.join('')).toContain('id="in-template"')
    })
  })

  describe('elements with svg sources', () => {
    it('records external img sources as image elements', async () => {
      const svgs = await gobble('<img src="https://cdn.example.com/logo.svg">')

      expect(svgs).toEqual(['<img src="https://cdn.example.com/logo.svg">'])
    })

    it('ignores imgs that are not svgs', async () => {
      const svgs = await gobble('<img src="https://cdn.example.com/photo.png">')

      expect(svgs).toEqual([])
    })

    it('falls back to lazy-load attributes', async () => {
      const svgs = await gobble('<img data-src="https://cdn.example.com/lazy.svg">')

      expect(svgs).toEqual(['<img src="https://cdn.example.com/lazy.svg">'])
    })

    it('decodes base64 and url-encoded data uris', async () => {
      const svgs = await gobble(`<img src="${base64Uri}"><img src="${encodedUri}">`)

      expect(svgs).toEqual([circle, rect])
    })

    it('finds object, embed, picture, and favicon sources', async () => {
      const svgs = await gobble(
        `<object type="image/svg+xml" data="https://example.com/object.svg"></object>
         <embed src="https://example.com/embed.svg">
         <picture><source srcset="https://example.com/a.svg 1x, https://example.com/b.png 2x"></picture>`,
        '<link rel="icon" type="image/svg+xml" href="https://example.com/favicon.svg">',
      )

      expect(svgs).toEqual([
        '<img src="https://example.com/object.svg">',
        '<img src="https://example.com/embed.svg">',
        '<img src="https://example.com/a.svg">',
        '<img src="https://example.com/favicon.svg">',
      ])
    })

    it('finds external <use> sprites and nested <image> hrefs', async () => {
      const svgs = await gobble(
        `<svg id="uses"><use href="/sprite.svg#icon"/><use href="#local"/></svg>
         <svg id="images"><image href="https://example.com/nested.svg"/></svg>`,
      )

      expect(svgs).toContain('<img src="/sprite.svg#icon">')
      expect(svgs).toContain('<img src="https://example.com/nested.svg">')
      expect(svgs).not.toContain('<img src="#local">')
    })
  })

  describe('css', () => {
    it('finds svg urls in computed styles', async () => {
      const svgs = await gobble(
        `<div style="background-image: url('https://example.com/bg.svg')"></div>
         <div style="background-image: url('${encodedUri}')"></div>
         <div style="background-image: url('https://example.com/bg.png')"></div>
         <ul style="list-style-image: url('https://example.com/bullet.svg')"></ul>`,
      )

      expect(svgs).toEqual([
        '<img src="https://example.com/bg.svg">',
        rect,
        '<img src="https://example.com/bullet.svg">',
      ])
    })

    it('ignores fragment-only clip-path and filter references', async () => {
      const svgs = await gobble(
        `<div style="clip-path: url(#clip); filter: url(#blur)"></div>
         <div style="clip-path: url(https://example.com/clip.svg#a)"></div>`,
      )

      expect(svgs).toEqual(['<img src="https://example.com/clip.svg#a">'])
    })

    it('extracts data uris from style tags and custom properties', async () => {
      const svgs = await gobble(
        '<p>content</p>',
        `<style>:root { --icon: url("${base64Uri}"); } .x { color: red; }</style>`,
      )

      expect(svgs).toEqual([circle])
    })
  })

  describe('naming', () => {
    const names = async (html: string) => {
      document.body.innerHTML = html
      const result = await findSvg()
      return result.data.map((item) => item.name)
    }

    it('prefers the file name, then id, title, and aria-label', async () => {
      expect(
        await names(
          `<img src="https://example.com/icons/arrow-left.svg">
           <svg id="logo-mark"><path d="M0 0"/></svg>
           <svg><title> Close </title><path d="M1 1"/></svg>
           <svg aria-label="Search"><path d="M2 2"/></svg>`,
        ),
      ).toEqual(['logo-mark', 'Close', 'Search', 'arrow-left'])
    })

    it('falls back to the host and position', async () => {
      expect(await names('<svg><path d="M0 0"/></svg>')).toEqual([`${location.host}-1`])
    })
  })
})
