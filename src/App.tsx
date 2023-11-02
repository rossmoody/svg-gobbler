import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { ErrorState } from 'src/components'
import { Collection } from 'src/routes/collection'
import { loader as collectionsLoader } from 'src/routes/collection/loader'
import { Details } from 'src/routes/details'
import { loader as rootLoader } from 'src/routes/root/loader'
import { Dashboard } from './routes/dashboard'
import { Root } from './routes/root'

export default function App() {
  const router = createMemoryRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorState />,
      loader: rootLoader,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      errorElement: <ErrorState />,
      loader: async () => {
        const { collections } = await chrome.storage.local.get('collections')
        return collections
      },
      children: [
        {
          path: 'collection/:id',
          element: <Collection />,
          errorElement: <ErrorState />,
          loader: collectionsLoader,
        },
      ],
    },
    {
      path: '/details/:id',
      element: <Details />,
      errorElement: <ErrorState />,
      loader: () => {
        console.log('Details loader called')
        return null
      },
    },
  ])

  return <RouterProvider router={router} />
}
