import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import { Tooltip } from '.'

type HelpIconProps = {
  content: string
}

/**
 * Displays a help icon with a tooltip on the hover of a group element.
 * Must be placed inside a group className to function.
 */
export const HelpIcon = ({ content }: HelpIconProps) => {
  return (
    <Tooltip content={content}>
      <QuestionMarkCircleIcon className="text-muted h-4 w-4 cursor-help opacity-0 transition-opacity ease-in group-hover:opacity-100" />
    </Tooltip>
  )
}
