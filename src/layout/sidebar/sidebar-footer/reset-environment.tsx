import { ArrowUturnDownIcon } from '@heroicons/react/24/outline'
import { useResetEnvironment } from 'src/hooks'
import { loc } from 'src/utilities/i18n'

export const ResetEnvironment = () => {
  const { reset } = useResetEnvironment()

  return (
    <li>
      <button className="collection-item" onClick={reset}>
        <ArrowUturnDownIcon aria-hidden="true" className="h-4 w-4 shrink-0 " />
        {loc('sidebar_reset')}
      </button>
    </li>
  )
}
