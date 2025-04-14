import { useNavigate, useParams } from 'react-router-dom'
import styles from './LocationFiles.module.css'
import { Card, Divider, Typography, Button } from '@mui/material'
import ImagesForm from '../Inputs/ImagesForm'
import LocationForm from '../MapForm/LocationForm'
import { useUserLocations } from '../../hooks/useLocations'

const LocationFiles: React.FC = () => {
  const navigate = useNavigate()
  const locationId = useParams().id as string
  const { location } = useUserLocations(locationId)

  if (!location) {
    return (
      <Card className={styles.card}>
        <Typography>Locación no encontrada</Typography>
        <Button variant="contained" onClick={() => navigate('/system')}>
          Regresar al perfil
        </Button>
      </Card>
    )
  }

  return (
    <Card className={styles.card}>
      <Typography variant="h4">Edición de ubicación y fotografías</Typography>
      <Divider />
      <LocationForm location={location} />
      <Divider />
      <ImagesForm locationId={locationId} photos={location.photos || []} />
      <Divider />
      <Typography>
        Si ha completado la edición de las imágenes y ubicación, o ya no desea
        realizar algún cambio puede regresar al perfil
      </Typography>
      <Button variant="contained" onClick={() => navigate('/system')}>
        Regresar al perfil
      </Button>
    </Card>
  )
}

export default LocationFiles
