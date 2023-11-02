import { Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { nanoid } from 'nanoid'
import { useEffect } from 'react'
import { NavLink, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { IconButton, Logo } from 'src/components'
import { useSidebar } from 'src/providers'
import { Collection } from 'types'

export const SidebarContent = () => {
  const collections = useLoaderData() as Collection[]
  const { state, dispatch } = useSidebar()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch({ type: 'set-collections', payload: collections })
  }, [collections, dispatch])

  function handleRemoveCollection(collection: Collection) {
    const isActiveCollection = pathname.includes(collection.id)
    const filteredCollections = state.collections.filter(({ id }) => id !== collection.id)

    // If there are no collections left, create an empty one
    if (filteredCollections.length === 0) {
      filteredCollections.push({ id: nanoid(), name: 'New Collection' })
    }

    dispatch({ type: 'set-collections', payload: filteredCollections })
    chrome.storage.local.set({ collections: filteredCollections })

    if (isActiveCollection) {
      return navigate(`collection/${filteredCollections[0].id}`)
    }
  }

  return (
    <div className="flex grow flex-col gap-y-4 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
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
                  </NavLink>
                  <IconButton
                    variant="ghost"
                    size="xs"
                    onClick={() => handleRemoveCollection(collection)}
                  >
                    <XMarkIcon className="h-3" />
                  </IconButton>
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
