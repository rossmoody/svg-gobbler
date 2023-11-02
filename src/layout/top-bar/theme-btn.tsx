import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { IconButton, Tooltip } from 'src/components'
import { useColorMode } from 'src/hooks'

export const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Tooltip content="Color mode">
      <IconButton variant="ghost" onClick={toggleColorMode}>
        {colorMode === 'dark' ? <MoonIcon height={24} /> : <SunIcon height={24} />}
      </IconButton>
    </Tooltip>
  )
}
