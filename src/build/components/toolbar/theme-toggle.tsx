import { IconButton, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { Moon, Sun } from 'react-feather'
import loc from '../utils/localization'

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

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
