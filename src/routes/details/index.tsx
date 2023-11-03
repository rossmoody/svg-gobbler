import { useNavigate } from 'react-router-dom'
import { Button } from 'src/components'

export const DetailsRoute = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Button onClick={() => navigate(-1)}>Back</Button>
    </div>
  )
}
