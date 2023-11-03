import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { ErrorState } from 'src/components'
import {
  CollectionRoute,
  DashboardRoute,
  DetailsRoute,
  RootRoute,
  collectionLoader,
  dashboardLoader,
  rootLoader,
} from 'src/routes'

export default function App() {
  const router = createMemoryRouter([
    {
      path: '/',
      element: <RootRoute />,
      errorElement: <ErrorState />,
      loader: rootLoader,
    },
    {
      path: '/dashboard',
      element: <DashboardRoute />,
      errorElement: <ErrorState />,
      loader: dashboardLoader,
      children: [
        {
          path: 'collection/:id',
          element: <CollectionRoute />,
          errorElement: <ErrorState />,
          loader: collectionLoader,
        },
      ],
    },
    {
      path: '/details/:id',
      element: <DetailsRoute />,
      errorElement: <ErrorState />,
    },
  ])

  return <RouterProvider router={router} />
}
