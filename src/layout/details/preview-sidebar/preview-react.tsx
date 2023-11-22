import { serverEndpoint } from 'server/config'
import { Button } from 'src/components'
import { useDetails } from 'src/providers'
import { logger } from 'src/utils/logger'

export const PreviewReact = () => {
  const { state } = useDetails()

  const handleClick = async () => {
    try {
      const response = await fetch(`${serverEndpoint.base}/svgr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ svg: state.currentString }),
      })

      const data = await response.text()
      console.log(data)
    } catch (error) {
      logger.error(error)
    }
  }

  return (
    <div>
      <Button onClick={handleClick}>Fetch stuff</Button>
    </div>
  )
}
