import { PropsWithChildren } from 'react'

const Heading = ({ children }: PropsWithChildren) => {
  return <h3 className="text-base font-semibold leading-7">{children}</h3>
}

const Description = ({ children }: PropsWithChildren) => {
  return <p className="text-muted mt-1 text-sm leading-6">{children}</p>
}

export const Setting = ({ children }: PropsWithChildren) => {
  return <div className="mb-4">{children}</div>
}

export const Item = ({ children }: PropsWithChildren) => {
  return <div className="sm:max-w-xl sm:grid-cols-6 md:col-span-2">{children}</div>
}

Item.Heading = Heading
Item.Description = Description
Item.Setting = Setting
