import { isDevelopmentEnvironment } from 'src/constants/server-config'

import { DebugData } from './debug-data-item'
import { FeedbackItem } from './feedback-item'
import { ResetEnvironment } from './reset-environment'
import { ReviewItem } from './review-item'
import { SettingsItem } from './settings-item'

type Item = {
  Component: React.ComponentType
  id: string
  shouldRender: boolean
}

const items: Item[] = [
  { Component: SettingsItem, id: 'settings', shouldRender: true },
  { Component: FeedbackItem, id: 'feedback', shouldRender: !isDevelopmentEnvironment },
  { Component: ReviewItem, id: 'review', shouldRender: !isDevelopmentEnvironment },
  { Component: ResetEnvironment, id: 'reset', shouldRender: isDevelopmentEnvironment },
  { Component: DebugData, id: 'json', shouldRender: isDevelopmentEnvironment },
]

export const SideFooter = () => (
  <footer>
    <h2 className="sr-only" id="settings-heading">
      User Settings
    </h2>
    <ul aria-labelledby="settings-heading">
      {items
        .filter(({ shouldRender }) => shouldRender)
        .map(({ Component, id }) => (
          <Component key={id} />
        ))}
    </ul>
  </footer>
)
