import { findSVGs } from './find-svgs';

class SVG {
  constructor(ele, url = null, type) {
    this.ele = ele;
    this.url = url;
    this.type = type;
  }

  // get svg XML info from el with URL
  async getXML() {
    this.svgString = this.ele.eleString;
    this.svgXml = this.ele;

    if (this.url) {
      await fetch(this.url, { mode: 'no-cors' })
        .then((r) => r.text())
        .then((text) => {
          this.svgString = text;
        })
        .catch();
    }
  }

  // Set size attributes to svg viewBox attr dynamically for better render in card
  async cleanupXML() {
    const rects = this.ele.getBoundingClientRect();
    const viewBoxHeight = Math.floor(rects.width);
    const viewBoxWidth = Math.floor(rects.height);

    if (rects.width === 0 && rects.height === 0) {
      this.rects = 'N/A';
    } else if (
      this.svgXml.hasAttribute('width') &&
      this.svgXml.hasAttribute('height')
    ) {
      const width = this.svgXml.getAttribute('width');
      const height = this.svgXml.getAttribute('height');
      if (width.includes('100%')) {
        this.rects = '100%';
      } else if (width.includes('px')) {
        this.rects = `${width.slice(0, -2)}x${height.slice(0, -2)}`;
      } else {
        this.rects = `${width}x${height}`;
      }
    } else {
      this.rects = `${viewBoxWidth}x${viewBoxHeight}`;
    }

    this.cleanXml = this.svgXml.cloneNode(true);
    this.cleanXml.setAttribute('class', 'gob__card__svg__trick');
    this.cleanXml.removeAttribute('height');
    this.cleanXml.removeAttribute('width');
    this.cleanXml.removeAttribute('style');
    this.cleanXml.hasAttribute('viewBox')
      ? ''
      : this.cleanXml.setAttribute(
          'viewBox',
          `0 0 ${viewBoxHeight} ${viewBoxWidth}`
        );
    this.cleanXml.getAttribute('viewBox') === '0 0 0 0'
      ? this.cleanXml.setAttribute('viewBox', `0 0 24 24`)
      : null;
    this.cleanXml.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  }

  async checkForWhite() {
    const whiteStrings = ['white', '#FFF', '#FFFFFF', '#fff', '#ffffff'];
    for (const string of whiteStrings) {
      this.svgString.includes(string) ? (this.hasWhite = true) : null;
    }
  }

  async checkForFill() {
    if (
      this.svgString.includes('fill=') &&
      !this.svgString.includes('fill="none"')
    ) {
      null;
    } else {
      this.cleanXml.setAttribute('fill', '#232323');
    }
  }
}

export async function organizeSVGs() {
  let allSVGs = findSVGs();

  // Create SVG classes
  allSVGs = allSVGs.map(async (i) => {
    const newEl = new SVG(i, i.url, i.type);
    await newEl.getXML();
    await newEl.cleanupXML();
    await newEl.checkForWhite();
    await newEl.checkForFill();
    return newEl;
  });
  allSVGs = await Promise.all(allSVGs);
  return allSVGs;
}
