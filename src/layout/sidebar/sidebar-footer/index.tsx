import {
  ArrowTopRightOnSquareIcon,
  Cog6ToothIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import { links } from 'src/constants/links'
import { loc } from 'src/utils/i18n'
import { FeedbackItem } from './feedback-item'
import { ResetEnvironment } from './reset-environment'

export const SideFooter = () => {
  function navigateToChromeWebStore() {
    window.open(links.chromeWebstore, '_blank')
  }

  return (
    <div>
      <h2 id="settings-heading" className="sr-only">
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
    </div>
  )
}
