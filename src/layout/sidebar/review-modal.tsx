import { MegaphoneIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { Button, Modal } from 'src/components'
import { links } from 'src/constants/links'
import { loc } from 'src/utils/i18n'

export const ReviewModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <button className="collection-item" onClick={() => setOpen(true)}>
        <MegaphoneIcon aria-hidden="true" className="h-4 w-4 shrink-0 " />
        {loc('sidebar_review')}
      </button>
      <Modal open={open} setOpen={setOpen}>
        <Modal.Header>{loc('sidebar_support')}</Modal.Header>
        <div className="text-muted flex flex-col gap-4 text-sm">
          <p>
            {loc('sidebar_free')},{' '}
            <a className="anchor" href={links.githubRepository}>
              {loc('sidebar_open')}
            </a>
            , {loc('sidebar_support_2')}
          </p>
          <p>{loc('sidebar_support_3')} 🚀</p>
        </div>
        <Modal.Footer>
          <Button
            onClick={() => {
              window.open(links.chromeWebstore, '_blank')
              setOpen(false)
            }}
            size="lg"
            type="submit"
          >
            {loc('sidebar_support_submit')}
          </Button>
          <Button onClick={() => setOpen(false)} size="lg" type="button" variant="secondary">
            {loc('sidebar_cancel')}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}
