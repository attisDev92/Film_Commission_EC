import { Card, Typography, Button } from '@mui/material'
import React, { useState } from 'react'
import { CloudUpload } from '@mui/icons-material'
import { setNotification } from '../../../../Redux/notificationReducer'
import { AppDispatch } from '../../../../Redux/store'
import { useDispatch } from 'react-redux'
import { styled } from '@mui/material/styles'
import UploadButton from '../../../../components/Buttons/UploadButton'
import styles from '../Loactions.module.css'

interface InputPosrterProps {
  locationId: string
  poster: {
    url: string
  }
}

const InputPoster: React.FC<InputPosrterProps> = ({ locationId, poster }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [filename, setFilename] = useState<string>('')
  const [file, setFile] = useState<File | undefined>(undefined)
  const dispatch = useDispatch<AppDispatch>()

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
    }

    const formData = new FormData()
    if (file) {
      formData.append('poster', file)
    }
    formData.append('locationId', locationId)

    try {
      //await dispatch(addFile(formData))
      setSuccess(true)
    } catch (error) {
      console.log(error)
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <Typography variant="h6">Imagen de portada</Typography>
      <form onSubmit={handleUploadFile}>
        <Typography variant="body1">
          Selecciona una imagen para la portada de la locación
        </Typography>
        <Typography variant="body2">
          {file ? filename : 'No se ha seleccionado ningún archivo'}
        </Typography>
        <Button
          component="label"
          variant="contained"
          role={undefined}
          tabIndex={-1}
          startIcon={<CloudUpload />}
        >
          Seleccionar afiche
          <VisuallyHiddenInput
            type="file"
            accept=".jpg, .png, .webp"
            onChange={handleChangeFile}
          />
        </Button>
        <UploadButton loading={loading} success={success} type="submit" />
        <p>Guardar imagen</p>
      </form>
      <div className={styles.poster__container}>
        {poster && poster.url && poster.url.trim() !== '' ? (
          <Card>
            <img src={poster.url} />
          </Card>
        ) : (
          <p>No tiene afiche</p>
        )}
      </div>
    </Card>
  )
}

export default InputPoster
