import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { IconButton, Tooltip } from 'src/components'
import { useColorMode } from 'src/hooks'

export const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Tooltip content="Color mode">
      <IconButton variant="ghost" onClick={toggleColorMode} size="lg">
        {colorMode === 'dark' ? (
          <MoonIcon height={20} aria-hidden="true" />
        ) : (
          <SunIcon height={20} aria-hidden="true" />
        )}
        <span className="sr-only">Toggle color mode</span>
      </IconButton>
    </Tooltip>
  )
}
