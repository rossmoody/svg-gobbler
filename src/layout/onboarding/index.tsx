import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { Logo } from 'src/components'
import { links } from 'src/constants/links'
import { findSvg } from 'src/scripts'
import { loc } from 'src/utilities/i18n'

import graphic from './onboarding-graphic.png'

export const OnboardingLayout = () => {
  const launchSvgGobbler = async () => {
    const { data } = await findSvg()

    chrome.runtime.sendMessage({
      data: {
        data,
        host: loc('onboarding_title'),
        href: links.svgGobblerHomepage,
        origin: links.svgGobblerHomepage,
      },
      type: 'launch-svg-gobbler-from-onboarding',
    })
  }

  return (
    <div className="relative isolate flex min-h-screen items-center overflow-hidden bg-white">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      >
        <defs>
          <pattern
            height={200}
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            patternUnits="userSpaceOnUse"
            width={200}
            x="50%"
            y={-1}
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
          height="100%"
          strokeWidth={0}
          width="100%"
        />
      </svg>
      <div className="mx-auto max-w-7xl px-6 py-8 lg:flex lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <Logo className="h-11" />
          <div className="mt-16">
            <a className="inline-flex space-x-6" href={links.githubReleases} target="_blank">
              <span className="rounded-full bg-red-600/10 px-3 py-1 text-sm font-semibold leading-6 text-red-600 ring-1 ring-inset ring-red-600/10">
                {loc('onboarding_new')}
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                <span>{loc('onboarding_version')}</span>
                <ChevronRightIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
              </span>
            </a>
          </div>
          <h1 className="mt-10 text-6xl font-bold tracking-tight text-gray-900">
            {loc('onboarding_title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {loc('onboarding_desc')}{' '}
            <a
              className="cursor-pointer text-red-600 hover:text-red-500"
              href={links.rossMoodyHomepage}
            >
              Ross Moody
            </a>{' '}
            {loc('onboarding_desc_2')}
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <button
              className="group flex items-center rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={launchSvgGobbler}
            >
              {loc('onboarding_launch')}
              <div className="h-5 w-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:ml-2 group-hover:w-5">
                <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
              </div>
            </button>
            <iframe
              height="30"
              src="https://ghbtns.com/github-btn.html?user=rossmoody&repo=svg-gobbler&type=star&count=true&size=large"
              title="GitHub"
              width="170"
            ></iframe>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-32 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none">
          <div className="max-w-3xl flex-none sm:max-w-5xl">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                alt="App screenshot"
                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                height={1442}
                src={graphic}
                width={2147}
              />
            </div>
          </div>
        </div>
      </div>
      <svg aria-hidden="true" className="sr-only" viewBox="0 0 16 16">
        <path d="M14.064 0h.186C15.216 0 16 .784 16 1.75v.186a8.75 8.75 0 0 1-2.564 6.186l-.458.459q-.472.471-.979.904v3.207c0 .608-.315 1.172-.833 1.49l-2.774 1.707a.75.75 0 0 1-1.11-.418l-.954-3.102a1 1 0 0 1-.145-.125L3.754 9.816a1 1 0 0 1-.124-.145L.528 8.717a.75.75 0 0 1-.418-1.11l1.71-2.774A1.75 1.75 0 0 1 3.31 4h3.204q.433-.508.904-.979l.459-.458A8.75 8.75 0 0 1 14.064 0M8.938 3.623h-.002l-.458.458c-.76.76-1.437 1.598-2.02 2.5l-1.5 2.317 2.143 2.143 2.317-1.5c.902-.583 1.74-1.26 2.499-2.02l.459-.458a7.25 7.25 0 0 0 2.123-5.127V1.75a.25.25 0 0 0-.25-.25h-.186a7.25 7.25 0 0 0-5.125 2.123M3.56 14.56c-.732.732-2.334 1.045-3.005 1.148a.23.23 0 0 1-.201-.064.23.23 0 0 1-.064-.201c.103-.671.416-2.273 1.15-3.003a1.502 1.502 0 1 1 2.12 2.12m6.94-3.935q-.132.09-.266.175l-2.35 1.521.548 1.783 1.949-1.2a.25.25 0 0 0 .119-.213ZM3.678 8.116 5.2 5.766q.087-.135.176-.266H3.309a.25.25 0 0 0-.213.119l-1.2 1.95ZM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
      </svg>
    </div>
  )
}
