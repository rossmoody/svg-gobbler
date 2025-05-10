import { ArrowTopRightOnSquareIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { links } from 'src/constants/links'
import { extension } from 'src/utilities/extension-utilities'
import { loc } from 'src/utilities/i18n'

export const ReviewItem = () => {
  function navigateToChromeWebStore() {
    const link = extension.isFirefox ? links.firefoxWebstore : links.chromeWebstore
    window.open(link, '_blank')
  }

  return (
    <li>
      <button className="collection-item group" onClick={navigateToChromeWebStore}>
        <PencilSquareIcon aria-hidden="true" className="h-4 w-4 shrink-0 " />
        {loc('sidebar_review')}
        <ArrowTopRightOnSquareIcon
          aria-hidden="true"
          className="h-0 w-0 shrink-0 transition-all duration-150 group-hover:h-4 group-hover:w-4"
        />
      </button>
    </li>
  )
}
