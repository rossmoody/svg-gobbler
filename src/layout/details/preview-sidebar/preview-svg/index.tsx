import type { CSSProperties } from 'react'

import Draggable from 'react-draggable'
import { ShadowSvg } from 'src/components/shadow-svg'
import { useDetails } from 'src/providers'

import { PreviewSvgFooter } from './preview-svg-footer'

/**
 * The preview renders inside a shadow root, so its outline and centering are
 * styled here rather than in the global stylesheet. The outline width comes
 * from a custom property so zooming doesn't re-parse the SVG.
 */
const PREVIEW_CSS = `
  svg { margin: auto; outline-width: var(--preview-outline-width); }
  svg:not(:hover) { outline-style: dashed; outline-color: #d1d5db; }
`

export const PreviewSvg = () => {
  const { state } = useDetails()

  const { background, scale } = state.preview.svg

  return (
    <>
      <div className={`flex-1 overflow-hidden p-4 ${background}`} id="preview-background">
        <div style={{ transform: `scale(${scale})` }}>
          <Draggable axis="both" handle=".handle" scale={scale}>
            <div className="handle cursor-grab" id="preview-svg">
              <ShadowSvg
                as="div"
                css={PREVIEW_CSS}
                markup={state.currentString}
                style={{ '--preview-outline-width': `calc(2px / ${scale})` } as CSSProperties}
              />
            </div>
          </Draggable>
        </div>
      </div>
      <PreviewSvgFooter />
    </>
  )
}

export default PreviewSvg
