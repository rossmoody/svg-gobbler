import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { ErrorState } from 'src/components'
import {
  CollectionRoute,
  DashboardRoute,
  DetailsRoute,
  RootRoute,
  SettingsRoute,
  collectionLoader,
  dashboardLoader,
  detailLoader,
  rootLoader,
  settingsLoader,
} from 'src/routes'

export default function App() {
  const router = createMemoryRouter([
    {
      element: <RootRoute />,
      errorElement: <ErrorState />,
      loader: rootLoader,
      path: '/',
    },
    {
      children: [
        {
          element: <CollectionRoute />,
          errorElement: <ErrorState />,
          loader: collectionLoader,
          path: 'collection/:id',
        },
        {
          element: <SettingsRoute />,
          errorElement: <ErrorState />,
          loader: settingsLoader,
          path: 'settings',
        },
      ],
      element: <DashboardRoute />,
      errorElement: <ErrorState />,
      loader: dashboardLoader,
      path: '/dashboard',
    },
    {
      element: <DetailsRoute />,
      errorElement: <ErrorState />,
      loader: detailLoader,
      path: '/details/:collectionId/:id',
    },
  ])

  return <RouterProvider router={router} />
}
