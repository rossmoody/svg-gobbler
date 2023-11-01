import { RouterProvider, createMemoryRouter, defer } from 'react-router-dom'
import { Root } from 'src/routes/root'
import { Collection } from './routes/collection'

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
          errorElement: <div>Oops! There was an error.</div>,
          loader: async ({ params }) => {
            console.log({ params })
            return defer({
              foo: new Promise((resolve) => setTimeout(() => resolve([]), 4000)),
            })
          },
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
