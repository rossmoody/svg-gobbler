import svgFactory from 'scripts/svg-factory/svg-factory'
import type { BackgroundMessage } from 'types'
import { EmptyState } from './components/empty-state'
import { Dashboard } from './layout/dashboard'
import { Providers } from './providers'

export default function App() {
  if (chrome !== undefined)
    chrome.runtime?.sendMessage('gobble', (response: BackgroundMessage) => {
      svgFactory.process(response.data).then(console.log)
    })

  return (
    <Providers>
      <Dashboard>
        <EmptyState />
      </Dashboard>
    </Providers>
  )
}
