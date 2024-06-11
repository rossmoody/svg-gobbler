import Draggable from 'react-draggable'
import { useDetails } from 'src/providers'

import { PreviewSvgFooter } from './preview-svg-footer'

export const PreviewSvg = () => {
  const { state } = useDetails()

  const { background, scale } = state.preview.svg

  return (
    <>
      <style>{`#preview-svg > svg { outline-width: calc(2px / ${scale}); }`}</style>
      <div className={`flex-1 overflow-hidden p-4 ${background}`} id="preview-background">
        <div style={{ transform: `scale(${scale})` }}>
          <Draggable axis="both" handle=".handle" scale={scale}>
            <div
              className="handle cursor-grab"
              dangerouslySetInnerHTML={{ __html: state.currentString }}
              id="preview-svg"
            />
          </Draggable>
        </div>
      </div>
      <PreviewSvgFooter />
    </>
  )
}

export default PreviewSvg
