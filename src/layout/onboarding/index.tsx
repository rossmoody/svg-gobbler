import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { nanoid } from 'nanoid'
import { Logo } from 'src/components'
import { links } from 'src/constants/links'
import { DocumentData } from 'src/scripts'
import { loc } from 'src/utilities/i18n'

import graphic from './onboarding-graphic.png'

export const OnboardingLayout = () => {
  const launchSvgGobbler = async () => {
    const data: DocumentData = {
      data: [
        {
          corsRestricted: false,
          id: nanoid(),
          lastEdited: new Date().toString(),
          name: 'svg-gobbler',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150.156 150.156"><g clip-path="url(#c)"><rect width="150.156" height="150.156" fill="#FB575E" rx="35.193"/><circle cx="24.635" cy="47.51" r="11.731" fill="#fff"/><circle cx="125.521" cy="47.51" r="11.731" fill="#fff"/><path fill="none" stroke="#fff" stroke-width="8.212" d="M24.635 47.51h100.886m-85.636 54.55s0-56.015 35.78-56.015 35.779 56.015 35.779 56.015"/><rect width="41.058" height="41.058" x="55.136" y="26.981" fill="#1E293B" rx="11.731"/><rect width="41.058" height="41.058" x="19.356" y="82.117" fill="#1E293B" rx="11.731"/><rect width="41.058" height="41.058" x="90.915" y="82.117" fill="#1E293B" rx="11.731"/></g></svg>`,
        },
      ],
      host: loc('onboarding_title'),
      href: links.svgGobblerHomepage,
      origin: links.svgGobblerHomepage,
    }

    chrome.runtime.sendMessage({
      data,
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
    </div>
  )
}
