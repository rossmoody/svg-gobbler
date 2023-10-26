import { IconButton, useColorMode } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Moon, Sun } from 'react-feather'
import loc from '../utils/localization'

function ThemeToggle() {
  const { colorMode, toggleColorMode, setColorMode } = useColorMode()

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setColorMode('dark')
    }
  }, [])

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label={loc('nav_theme')}
      borderRadius="md"
      icon={colorMode === 'light' ? <Moon /> : <Sun />}
      size="lg"
    />
  )
}

export default ThemeToggle
