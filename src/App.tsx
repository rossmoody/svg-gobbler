import { EmptyState } from './components/empty-state'
import { Dashboard } from './layout/dashboard'
import { Providers } from './providers'

export default function App(props: unknown) {
  console.log(props)
  // if (chrome !== undefined)
  //   chrome.runtime?.sendMessage('gobble', (response: BackgroundMessage) => {
  //     svgFactory.process(response.data).then(console.log)
  //   })

  return (
    <Providers>
      <Dashboard>
        <EmptyState />
      </Dashboard>
    </Providers>
  )
}
