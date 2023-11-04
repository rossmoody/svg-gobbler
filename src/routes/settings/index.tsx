import { useNavigate } from 'react-router-dom'
import { Button } from 'src/components'

export const SettingsRoute = () => {
  const navigate = useNavigate()

  return (
    <div>
      Settings
      <Button onClick={() => navigate(-1)}>Back</Button>
    </div>
  )
}
