import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { ErrorState } from 'src/components'
import { Collection } from 'src/routes/collection'
import { loader as collectionsLoader } from 'src/routes/collection/loader'
import { Root } from 'src/routes/root'

export default function App() {
  // if (chrome !== undefined)
  //   chrome.runtime?.sendMessage('gobble', (response: BackgroundMessage) => {
  //     svgFactory.process(response.data).then(console.log)
  //   })

  const router = createMemoryRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: 'collection/:id',
          element: <Collection />,
          errorElement: <ErrorState />,
          loader: collectionsLoader,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
