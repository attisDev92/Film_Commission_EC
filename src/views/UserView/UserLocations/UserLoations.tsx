import { Button, Card, Typography } from '@mui/material'
import styles from './Loactions.module.css'
import { NavigateFunction, useNavigate } from 'react-router-dom'

const UserLocations: React.FC = () => {
  const navigate: NavigateFunction = useNavigate()

  return (
    <>
      <Card className={styles.card}>
        <Typography variant="h4">Locaciones del usuario</Typography>
        {/* si no tiene locaciones */}
        {/* si tiene locaciones */}
      </Card>
      <Card className={styles.card}>
        <Typography variant="h4">Registra de Locaciones</Typography>
        <Typography variant="body1">Registra una nueva locación</Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/system/register_location')}
        >
          Registrar
        </Button>
      </Card>
    </>
  )
}

export default UserLocations
