import React from 'react'
import { IconButton, useColorMode } from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label="Theme toggle"
      borderRadius="md"
      icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
    />
  )
}

export default ThemeToggle
