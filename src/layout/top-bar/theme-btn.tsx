import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { IconButton, Tooltip } from 'src/components'
import { useColorMode } from 'src/hooks'
import { loc } from 'src/utils/i18n'

export const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Tooltip content={loc('topbar_color_tooltip')}>
      <IconButton onClick={toggleColorMode} size="lg" variant="ghost">
        {colorMode === 'dark' ? (
          <MoonIcon aria-hidden="true" className="h-5 w-5" />
        ) : (
          <SunIcon aria-hidden="true" className="h-5 w-5" />
        )}
        <span className="sr-only">{loc('topbar_color')}</span>
      </IconButton>
    </Tooltip>
  )
}
