import { links } from 'src/constants/links'
import { loc } from 'src/utils/i18n'

import { Category } from './category'

export const AboutSettings = () => {
  return (
    <Category description={loc('settings_about_desc')} title={loc('settings_about')}>
      <div className="sm:max-w-xl sm:grid-cols-6 md:col-span-2">
        <div className="mb-8">
          <h3 className="text-base font-semibold leading-7">{loc('settings_contribute')}</h3>
          <p className="text-muted mt-1 text-sm leading-6">
            {loc('settings_contribute_desc')}{' '}
            <a className="anchor" href={links.githubRepository}>
              {loc('settings_contribute_desc_2')}
            </a>
            .
          </p>
        </div>

        <div className="mb-8">
          <div className="sm:max-w-xl sm:grid-cols-6 md:col-span-2">
            <h3 className="text-base font-semibold leading-7">{loc('settings_bug')}</h3>
            <p className="text-muted mt-1 text-sm leading-6">
              {loc('settings_bug_desc')}{' '}
              <a className="anchor" href={links.githubIssues}>
                {loc('settings_open_issue')}
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="sm:max-w-xl sm:grid-cols-6 md:col-span-2">
            <h3 className="text-base font-semibold leading-7">{loc('settings_disclaimer')}</h3>
            <p className="text-muted mt-1 text-sm leading-6">{loc('settings_disclaimer_desc')}</p>
          </div>
        </div>
      </div>
    </Category>
  )
}
