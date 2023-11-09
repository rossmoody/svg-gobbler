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
import { detailLoader } from './routes/details/loader'
import { SettingsRoute } from './routes/settings'

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
        {
          path: 'settings',
          element: <SettingsRoute />,
          errorElement: <ErrorState />,
        },
      ],
    },
    {
      path: '/details/:originalString',
      element: <DetailsRoute />,
      errorElement: <ErrorState />,
      loader: detailLoader,
    },
  ])

  return <RouterProvider router={router} />
}
