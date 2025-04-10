import { useNavigate, useParams } from 'react-router-dom'
import styles from './LocationFiles.module.css'
import { Card, Divider, Typography, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { GlobalState } from '../../../../app/store/store'
import { LocationTypes } from '../../types/LocationTypes'
import ImagesForm from '../Inputs/ImagesForm'
import LocationForm from '../Inputs/LocationForm'

const LocationFiles: React.FC = () => {
  const navigate = useNavigate()
  const locationId = useParams().id || ''

  const location = useSelector<GlobalState, LocationTypes | undefined>(
    (state) => state.locations.find((loc) => loc.id === locationId),
  )

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
      <Typography variant="h4">Edición de locación</Typography>
      <Divider />
      <LocationForm
        locationId={locationId}
        coordinates={location.coordinates || []}
      />
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
