import { Card, Typography } from '@mui/material'
import styles from './UserCards.module.css'

const UserLocations: React.FC = () => {
  return (
    <>
      <Card className={styles.card}>
        <Typography variant="h5">Locaciones del usuario</Typography>
        {/* si no tiene locaciones */}
        {/* si tiene locaciones */}
      </Card>
    </>
  )
}

export default UserLocations
