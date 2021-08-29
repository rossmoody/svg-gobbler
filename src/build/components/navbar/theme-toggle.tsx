import React from 'react'
import { IconButton, useColorMode } from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'

import loc from '../utils/localization'

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  const Icon = () => (colorMode === 'light' ? <FaMoon /> : <FaSun />)

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label={loc('nav_theme')}
      borderRadius="md"
      icon={<Icon />}
    />
  )
}

export default ThemeToggle
