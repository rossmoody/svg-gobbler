import { Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useEffect } from 'react'
import { NavLink, useLoaderData } from 'react-router-dom'
import { IconButton, Logo } from 'src/components'
import { useSidebar } from 'src/providers'
import { Collection } from 'types'
import { useRemoveCollection } from './hooks/use-remove-collection'

export const SidebarContent = () => {
  const collections = useLoaderData() as Collection[]
  const { state, dispatch } = useSidebar()
  const handleRemoveCollection = useRemoveCollection()

  useEffect(() => {
    dispatch({ type: 'set-collections', payload: collections })
  }, [collections, dispatch])

  return (
    <div className="flex grow flex-col gap-y-4 overflow-y-auto border-r px-6 pb-4 border-gray-200 dark:border-gray-800">
      <div className="flex h-16 shrink-0 items-center mt-2">
        <Logo className="h-8 w-auto" />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {state.collections.map((collection) => (
                <li key={collection.id}>
                  <NavLink
                    to={`collection/${collection.id}`}
                    className={(props) => {
                      return clsx(
                        props.isActive
                          ? 'bg-gray-50 text-red-600'
                          : 'text-gray-700 hover:text-red-600 hover:bg-gray-50',
                        'flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold justify-between',
                      )
                    }}
                  >
                    {collection.name}
                    <IconButton
                      variant="ghost"
                      size="xs"
                      onClick={(event) => {
                        event.preventDefault()
                        handleRemoveCollection(collection)
                      }}
                      className="z-10"
                    >
                      <XMarkIcon className="h-3" />
                    </IconButton>
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <NavLink
              to="/details/1"
              className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-red-600"
            >
              <Cog6ToothIcon
                className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-red-600"
                aria-hidden="true"
              />
              Details
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}
