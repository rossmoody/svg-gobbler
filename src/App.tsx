import svgFactory from 'scripts/svg-factory/svg-factory'
import type { BackgroundMessage } from 'types'
import logo from '../assets/prod/128.png'
import './App.css'

function App() {
  chrome.runtime.sendMessage('gobble', (response: BackgroundMessage) => {
    const data = svgFactory.process(response.data)
    console.log(data)
  })

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank"></a>
        <a href="https://react.dev" target="_blank">
          <img src={logo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card"></div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
