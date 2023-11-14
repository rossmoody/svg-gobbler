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
    <span className="bg-gray-100 dark:bg-gray-700 rounded-sm px-1.5 py-1 text text-base mx-1">
      {shortcut}
    </span>
  )
}
