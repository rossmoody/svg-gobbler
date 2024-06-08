import { Fragment } from 'react/jsx-runtime'
import { useDetails } from 'src/providers'

import { PreviewSvgFooter } from './preview-svg-footer'

export const PreviewSvg = () => {
  const { state } = useDetails()

  return (
    <Fragment>
      <div className="flex-1 overflow-hidden" style={{ background: state.preview.svg.background }}>
        <div dangerouslySetInnerHTML={{ __html: state.currentString }} />
      </div>
      <PreviewSvgFooter />
    </Fragment>
  )
}
