import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import UploadButton from '../../../../components/Buttons/UploadButton'
import { setNotification } from '../../../../Redux/notificationReducer'
import styles from '../Loactions.module.css'
import { Button, ImageList } from '@mui/material'
import ImagesCardEdit from './ImagesCardEdit'
//import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../../../Redux/store'

interface InputPhotosProps {
  photos: Array<{ _id: string; url: string }>
  locationId: string
}

const InputPhotos: React.FC<InputPhotosProps> = ({ photos, locationId }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [filename, setFilename] = useState('')
  const [file, setFile] = useState<File | undefined>()
  const dispatch = useDispatch<AppDispatch>()
  //const navigate = useNavigate()

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  })

  const handleChangeFile = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSuccess(false)
    if (!target.files) {
      return
    }
    const selectedFile = target.files[0]
    const maxSizeInBytes = 5 * 1024 * 1024

    if (selectedFile.size > maxSizeInBytes) {
      dispatch(
        setNotification({
          text: 'El archivo pesa más de 5mb',
          style: 'error',
        }),
      )
      return
    }
    setFile(selectedFile)
    setFilename(selectedFile.name)
  }

  const handleUploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    if (!file) {
      dispatch(
        setNotification({
          text: 'No se ha seleccionado ningún archivo',
          style: 'error',
        }),
      )
      return
    }

    const formData = new FormData()
    formData.append('stills', file)
    formData.append('movieId', locationId)

    try {
      //await dispatch(addFile(formData))
      setSuccess(true)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteImages = (fileId: string) => {
    console.log(fileId)
    //   dispatch(deleteFile(fileId, movieId)).then(() => {
    //     navigate(`/movies/${movieId}/files`)
    //   })
  }

  return (
    <div className={styles.inputImages}>
      <form onSubmit={handleUploadFile} encType="multipart/form-data">
        <h4>Fotogramas</h4>
        <p>
          {photos.length >= 5
            ? 'Número máximo de fotogramas, debe eliminar un archivo antes de subir uno nuevo'
            : 'Seleccionar archivo:'}
        </p>
        <p>{file ? filename : 'No se ha seleccionado ningún archivo'}</p>
        <Button
          component="label"
          variant="contained"
          role={undefined}
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          disabled={photos.length >= 5 ? true : false}
        >
          Seleccionar fotograma
          <VisuallyHiddenInput
            type="file"
            accept=".jpg, .png, .webp"
            onChange={handleChangeFile}
          />
        </Button>
        <UploadButton loading={loading} success={success} type="submit" />
        <p>Guardar imagen</p>
      </form>
      <div className={styles.stills__container}>
        {photos.length > 0 ? (
          <ImageList cols={2}>
            {photos.map((item, i) => (
              <ImagesCardEdit
                item={item}
                //locationId={locationId}
                key={i}
                deleteImageFunc={handleDeleteImages}
              />
            ))}
          </ImageList>
        ) : (
          <p>No cuenta con fotogramas</p>
        )}
      </div>
    </div>
  )
}

export default InputPhotos
