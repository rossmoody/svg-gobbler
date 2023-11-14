import { PropsWithChildren } from 'react'

type CategoryProps = {
  title: string
  description: string
}

export const Category = ({ children, title, description }: PropsWithChildren<CategoryProps>) => (
  <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
    <div>
      <h2 className="text-lg font-semibold leading-7">{title}</h2>
      <p className="text-muted mt-1 text-sm leading-6">{description}</p>
    </div>
    {children}
  </div>
)
