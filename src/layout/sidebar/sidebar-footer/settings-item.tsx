import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import { loc } from 'src/utilities/i18n'

export const SettingsItem = () => {
  return (
    <li className="pt-8">
      <NavLink className="collection-item" to="settings">
        <Cog6ToothIcon aria-hidden="true" className="h-4 w-4 shrink-0 " />
        {loc('sidebar_settings')}
      </NavLink>
    </li>
  )
}
