import svgFactory from 'scripts/svg-factory/svg-factory'
import type { BackgroundMessage } from 'types'
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
        {/* {Array.from({ length: 100 }).map((_, index) => (
          <p key={index}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        ))} */}
      </Dashboard>
    </Providers>
  )
}
