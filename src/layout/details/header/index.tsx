import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { IconButton } from 'src/components'

export const Header = () => {
  const navigate = useNavigate()

  const navigateBack = () => navigate(-1)

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-gray-800">
      <nav className="flex items-center gap-3">
        <IconButton onClick={navigateBack} size="sm" variant="secondary">
          <ArrowLeftIcon className="h-5 w-5" />
        </IconButton>
        <h1 className="text-lg font-semibold">Edit SVG</h1>
      </nav>
    </header>
  )
}
