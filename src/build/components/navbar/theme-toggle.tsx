import React from 'react'
import { IconButton, useColorMode } from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  const Icon = () => (colorMode === 'light' ? <FaMoon /> : <FaSun />)

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label="Theme toggle"
      borderRadius="md"
      icon={<Icon />}
    />
  )
}

export default ThemeToggle
