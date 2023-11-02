import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { ErrorState } from 'src/components'
import { Collection } from 'src/routes/collection'
import { loader as collectionsLoader } from 'src/routes/collection/loader'
import { Dashboard } from 'src/routes/dashboard'
import { loader as dashboardLoader } from 'src/routes/dashboard/loader'
import { Details } from 'src/routes/details'
import { Root } from 'src/routes/root'
import { loader as rootLoader } from 'src/routes/root/loader'

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
      loader: dashboardLoader,
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
    },
  ])

  return <RouterProvider router={router} />
}
