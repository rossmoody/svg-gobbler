import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { loc } from 'src/utilities/i18n'
import { StorageUtilities } from 'src/utilities/storage-utilities'

const WARN_THRESHOLD = 0.75
const DANGER_THRESHOLD = 0.85

type StorageUsage = {
  bytesInUse: number
  percent: number
  quotaBytes: number
}

function formatMb(bytes: number): string {
  return (bytes / 1_048_576).toFixed(1)
}

export const StorageWarning = () => {
  const [usage, setUsage] = useState<StorageUsage>()

  useEffect(() => {
    StorageUtilities.getStorageUsage().then(setUsage)
  }, [])

  if (!usage || usage.percent < WARN_THRESHOLD) return

  const isDanger = usage.percent >= DANGER_THRESHOLD
  const percentDisplay = Math.min(Math.round(usage.percent * 100), 100)

  const colorClasses = isDanger
    ? {
        bar: 'bg-red-500',
        bg: 'bg-red-50 dark:bg-red-950',
        icon: 'text-red-600 dark:text-red-400',
        label: 'text-red-700 dark:text-red-300',
        text: 'text-red-600 dark:text-red-400',
      }
    : {
        bar: 'bg-amber-500',
        bg: 'bg-amber-50 dark:bg-amber-950',
        icon: 'text-amber-600 dark:text-amber-400',
        label: 'text-amber-700 dark:text-amber-300',
        text: 'text-amber-600 dark:text-amber-400',
      }

  return (
    <div className={`mb-2 rounded-md px-3 py-2 text-xs ${colorClasses.bg}`}>
      <div className="flex items-center gap-1.5">
        <ExclamationTriangleIcon
          aria-hidden="true"
          className={`h-3.5 w-3.5 shrink-0 ${colorClasses.icon}`}
        />
        <span className={`font-medium ${colorClasses.label}`}>{loc('storage_warning_title')}</span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-full rounded-full ${colorClasses.bar}`}
          style={{ width: `${percentDisplay}%` }}
        />
      </div>
      <p className={`mt-1 ${colorClasses.text}`}>
        {formatMb(usage.bytesInUse)} / {formatMb(usage.quotaBytes)} MB &mdash;{' '}
        {loc('storage_warning_desc')}
      </p>
    </div>
  )
}
