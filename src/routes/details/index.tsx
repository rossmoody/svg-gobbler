import { Transition } from '@headlessui/react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Svg } from 'scripts/svg-classes/svg'
import { Button } from 'src/components'

export const DetailsRoute = () => {
  const svg = useLoaderData() as Svg
  const navigate = useNavigate()
  console.log(svg)

  return (
    <Transition
      show
      appear
      as="div"
      enter="transition-opacity duration-300 ease-in-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300 ease-in-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="h-screen w-screen surface"
    >
      Details
      <Button onClick={() => navigate(-1)}>Back</Button>
    </Transition>
  )
}
