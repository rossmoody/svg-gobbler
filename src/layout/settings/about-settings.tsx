import { links } from 'src/constants/links'
import { Category } from './category'

export const AboutSettings = () => {
  return (
    <Category
      title="About"
      description="A little history of the SVG Gobbler extension and how to support."
    >
      <div className="sm:max-w-xl sm:grid-cols-6 md:col-span-2">
        <div className="mb-8">
          <h3 className="text-base font-semibold leading-7">Contribute</h3>
          <p className="text-muted mt-1 text-sm leading-6">
            The SVG Gobbler extension is open source and available for{' '}
            <a className="anchor" href={links.githubRepository}>
              contribution on GitHub
            </a>
            .
          </p>
        </div>

        <div className="mb-8">
          <div className="sm:max-w-xl sm:grid-cols-6 md:col-span-2">
            <h3 className="text-base font-semibold leading-7">Submit a bug</h3>
            <p className="text-muted mt-1 text-sm leading-6">
              Encounter a bug or have a feature request?{' '}
              <a className="anchor" href={links.githubIssues}>
                Open an issue on GitHub
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="sm:max-w-xl sm:grid-cols-6 md:col-span-2">
            <h3 className="text-base font-semibold leading-7">Disclaimer</h3>
            <p className="text-muted mt-1 text-sm leading-6">
              This open-source browser extension was made, and is intended to facilitate the
              downloading of SVG icons from websites for personal, educational, or legitimate
              professional use. Users are expected to respect intellectual property rights and
              should not use this tool for infringing upon copyrights or for commercial purposes
              without proper authorization.
            </p>
          </div>
        </div>
      </div>
    </Category>
  )
}
