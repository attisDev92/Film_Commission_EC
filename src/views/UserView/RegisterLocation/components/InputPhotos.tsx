import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CloudUpload } from '@mui/icons-material'
import { Button, ImageList, Typography } from '@mui/material'
import { setNotification } from '../../../../Redux/notificationReducer'
import { AppDispatch } from '../../../../Redux/store'
import UploadButton from '../../../../components/Buttons/UploadButton'
import styles from '../Loactions.module.css'
import { editFile, deleteFile } from '../../../../Redux/locationReducer'
import ImageCardEdit from '../../../../components/Cards/ImageCardEdit'

interface InputPhotosProps {
  locationId: string
  photos: Array<{
    url: string
    _id: string
  }>
}

const MAX_PHOTOS = 10

const InputPhotos: React.FC<InputPhotosProps> = ({ locationId, photos }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (photos.length >= MAX_PHOTOS) {
        dispatch(
          setNotification({
            style: 'error',
            text: 'Has alcanzado el límite máximo de 10 fotos',
          }),
        )
        return
      }

      if (file.type.startsWith('image/')) {
        setSelectedFile(file)
      } else {
        dispatch(
          setNotification({
            style: 'error',
            text: 'Por favor seleccione un archivo de imagen válido',
          }),
        )
      }
    }
  }

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('type', 'photo')
      formData.append('locationId', locationId)

      try {
        await dispatch(editFile(formData))
        setSelectedFile(null)
      } catch (error) {
        console.error('Error al subir el archivo:', error)
      }
    }
  }

  const handleDelete = async (photoId: string) => {
    try {
      await dispatch(deleteFile(locationId, photoId))
    } catch (error) {
      console.error('Error al eliminar la foto:', error)
    }
  }

  return (
    <div className={styles.photos_container}>
      <ImageList sx={{ width: '100%' }} cols={3}>
        {photos.map((photo) => (
          <ImageCardEdit
            key={photo._id}
            imageUrl={photo.url}
            onDelete={() => handleDelete(photo._id)}
          />
        ))}
      </ImageList>
      {photos.length < MAX_PHOTOS && (
        <>
          <UploadButton onChange={handleFileSelect} />
          {selectedFile && (
            <Button
              variant="contained"
              startIcon={<CloudUpload />}
              onClick={handleUpload}
            >
              Subir imagen
            </Button>
          )}
        </>
      )}
      <Typography variant="caption" color="textSecondary">
        {photos.length} de {MAX_PHOTOS} fotos
      </Typography>
    </div>
  )
}

export default InputPhotos
