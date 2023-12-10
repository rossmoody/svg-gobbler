import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { IconButton, Tooltip } from 'src/components'
import { useColorMode } from 'src/hooks'

export const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Tooltip content="Color mode">
      <IconButton onClick={toggleColorMode} size="lg" variant="ghost">
        {colorMode === 'dark' ? (
          <MoonIcon aria-hidden="true" className="h-5 w-5" />
        ) : (
          <SunIcon aria-hidden="true" className="h-5 w-5" />
        )}
        <span className="sr-only">Toggle color mode</span>
      </IconButton>
    </Tooltip>
  )
}
