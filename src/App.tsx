import { useEffect, useState } from 'react'
import svgFactory from 'scripts/svg-factory/svg-factory'
import type { BackgroundMessage, ContentMessage } from 'types'
import logo from '../assets/prod/128.png'
import './App.css'

function App() {
  const [result, setResult] = useState('Loading...')

  useEffect(() => {
    chrome.runtime.sendMessage<ContentMessage>(
      { page: 'default' },
      (response: BackgroundMessage) => {
        const data = svgFactory.process(response.data)
        console.log(data)
        setResult(JSON.stringify(data))
      },
    )
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank"></a>
        <a href="https://react.dev" target="_blank">
          <img src={logo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>{result}</p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
