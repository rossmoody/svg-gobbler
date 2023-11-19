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
          loader: settingsLoader,
        },
      ],
    },
    {
      path: '/details/:collectionId/:id',
      element: <DetailsRoute />,
      errorElement: <ErrorState />,
      loader: detailLoader,
    },
  ])

  return <RouterProvider router={router} />
}
