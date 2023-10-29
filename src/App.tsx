import svgFactory from 'scripts/svg-factory/svg-factory'
import type { BackgroundMessage } from 'types'
import { Dashboard } from './layout/dashboard'

function App() {
  chrome.runtime.sendMessage('gobble', (response: BackgroundMessage) => {
    svgFactory.process(response.data).then(console.log)
  })

  return <Dashboard />
}

export default App
