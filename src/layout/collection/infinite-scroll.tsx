import { useEffect } from 'react'
import { useIntersectionObserver } from 'src/hooks'
import { useCollection } from 'src/providers'

export const InfiniteScroll = () => {
  const { dispatch } = useCollection()
  const { elementRef, isIntersecting } = useIntersectionObserver()

  useEffect(() => {
    if (isIntersecting) {
      dispatch({ type: 'load-more' })
    }
  }, [isIntersecting, dispatch])

  return <li ref={elementRef as React.RefObject<HTMLLIElement>} />
}
