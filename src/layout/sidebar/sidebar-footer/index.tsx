import {
  ArrowTopRightOnSquareIcon,
  Cog6ToothIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import { links } from 'src/constants/links'
import { extension } from 'src/utilities/extension-utilities'
import { loc } from 'src/utilities/i18n'

import { FeedbackItem } from './feedback-item'
import { ResetEnvironment } from './reset-environment'

export const SideFooter = () => {
  return (
    <footer>
      <h2 className="sr-only" id="settings-heading">
        User Settings
      </h2>
      <ul aria-labelledby="settings-heading">
        <li className="pt-8">
          <NavLink className="collection-item" to="settings">
            <Cog6ToothIcon aria-hidden="true" className="h-4 w-4 shrink-0 " />
            {loc('sidebar_settings')}
          </NavLink>
        </li>
        <li>
          <FeedbackItem />
        </li>
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
        <li>
          <ResetEnvironment />
        </li>
      </ul>
    </footer>
  )
}

function navigateToChromeWebStore() {
  const link = extension.isFirefox ? links.firefoxWebstore : links.chromeWebstore
  window.open(link, '_blank')
}
