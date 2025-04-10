import { Card, Typography, Divider } from '@mui/material'
import styles from './Inputs.module.css'
import InputPhotos from './InputPhotos'
import { Image } from '../../../../common/types/types'
interface ImagesFormProps {
  locationId: string
  photos: Image[]
}

const ImagesForm: React.FC<ImagesFormProps> = ({ locationId, photos }) => {
  return (
    <Card className={styles.card}>
      <Typography variant="h5">Imágenes de la locación</Typography>
      <Typography variant="body2" color="textSecondary">
        Puedes subir hasta 10 fotos de la locación
      </Typography>
      <Divider />
      <InputPhotos locationId={locationId} photos={photos} />
    </Card>
  )
}

export default ImagesForm
