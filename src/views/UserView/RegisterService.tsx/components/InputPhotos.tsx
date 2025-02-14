import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import UploadButton from '../../../../components/Buttons/UploadButton'
import { setNotification } from '../../../../Redux/notificationReducer'
import { Button, ImageList, Typography } from '@mui/material'
import ImagesCardEdit from '../../../../components/Cards/ImageCardEdit'
import { useNavigate } from 'react-router-dom'
import { Image } from '../../../../types'
import { AppDispatch } from '../../../../Redux/store'
import { deleteFileCompany, editFile } from '../../../../Redux/companiesReducer'
import styles from '../RegisterServices.module.css'

interface InputPhotosProps {
  photos: Image[]
  companyId: string
}

const InputPhotos: React.FC<InputPhotosProps> = ({
  photos = [],
  companyId,
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [filename, setFilename] = useState<string>('')
  const [file, setFile] = useState<File | null>()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

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
    if (!target.files) return
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
    }

    const formData = new FormData()
    if (file) {
      formData.append('photo', file)
    }
    formData.append('companyId', companyId)

    try {
      await dispatch(editFile(formData))
      setSuccess(true)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteImages = (fileId: string) => {
    dispatch(deleteFileCompany(fileId, companyId)).then(() => {
      navigate(`/system/services/files/${companyId}`)
    })
  }

  return (
    <div className={styles.editImagesContainer}>
      <form onSubmit={handleUploadFile} encType="multipart/form-data">
        <Typography variant="h5">Fotos</Typography>
        <Typography>Puede subir un máximo de 5 fotos.</Typography>
        <Typography variant="body1">
          {photos.length >= 5
            ? 'Número máximo de fotogramas, debe eliminar un archivo antes de subir uno nuevo'
            : 'Seleccionar archivo:'}
        </Typography>
        <span>
          <Typography>
            {file ? filename : 'No se ha seleccionado ningún archivo'}
          </Typography>
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
        </span>
        <span>
          <UploadButton loading={loading} success={success} type="submit" />
          <Typography>Guardar imagen</Typography>
        </span>
      </form>
      {photos.length > 0 ? (
        <ImageList cols={2} rowHeight={200}>
          {photos?.map((item: Image, i: number) => (
            <ImagesCardEdit
              key={i}
              item={item}
              deleteImageFunc={handleDeleteImages}
            />
          ))}
        </ImageList>
      ) : (
        <p>No cuenta con fotografías guardadas</p>
      )}
    </div>
  )
}

export default InputPhotos
