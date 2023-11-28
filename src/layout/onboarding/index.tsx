import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { gatherPageData } from 'scripts/gather-page-data'
import { Logo } from 'src/components'
import { links } from 'src/constants/links'
import graphic from './onboarding-graphic.png'

export const OnboardingLayout = () => {
  const launchSvgGobbler = async () => {
    chrome.runtime.sendMessage({
      type: 'launch-svg-gobbler-from-onboarding',
      data: {
        ...gatherPageData(),
        host: 'Welcome to SVG Gobbler',
        origin: links.svgGobblerHomepage,
      },
    })
  }

  return (
    <div className="relative isolate flex min-h-screen items-center overflow-hidden bg-white">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        />
      </svg>
      <div className="mx-auto max-w-7xl px-6 py-8 lg:flex lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <Logo className="h-11" />
          <div className="mt-16">
            <a href={links.githubReleases} className="inline-flex space-x-6" target="_blank">
              <span className="rounded-full bg-red-600/10 px-3 py-1 text-sm font-semibold leading-6 text-red-600 ring-1 ring-inset ring-red-600/10">
                What's new
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                <span>Version 5.0</span>
                <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </a>
          </div>
          <h1 className="mt-10 text-6xl font-bold tracking-tight text-gray-900">
            Welcome to SVG Gobbler
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            SVG Gobbler is an open-source browser extension created by{' '}
            <a
              href={links.rossMoodyHomepage}
              className="cursor-pointer text-red-600 hover:text-red-500"
            >
              Ross Moody
            </a>{' '}
            out in sunny San Francisco. Contribute to the project, share your feature ideas, or
            submit bugs on Github.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <button
              onClick={launchSvgGobbler}
              className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Launch SVG Gobbler
            </button>
            <a
              href={links.githubRepository}
              className="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-900"
              target="_blank"
            >
              Visit GitHub <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-32 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none">
          <div className="max-w-3xl flex-none sm:max-w-5xl">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                src={graphic}
                alt="App screenshot"
                width={2147}
                height={1442}
                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
        G
      </div>
    </div>
  )
}
