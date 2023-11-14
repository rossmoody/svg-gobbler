import { useEffect, useState } from 'react'

export const KeyboardShortcut = () => {
  const [shortcut, setShortcut] = useState('')

  useEffect(() => {
    const getKeyboardShortcut = async () => {
      const commands = await chrome.commands.getAll()
      const executeCommand = commands.find((command) => command.name === '_execute_action')
      setShortcut(executeCommand?.shortcut ?? '')
    }

    getKeyboardShortcut()
  }, [])

  if (!shortcut) {
    return <span>not set</span>
  }

  return (
    <span className="text mx-1 rounded-sm bg-gray-100 px-1.5 py-1 text-base dark:bg-gray-700">
      {shortcut}
    </span>
  )
}
