import { Card, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { Image } from '../../../../common/types/types'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../app/store/store'
import { setNotification } from '../../../../app/store/slices/setNotification'
import { styled } from '@mui/material/styles'
import UploadButton from '../../../../common/components/Buttons/UploadButton'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { editFile } from '../../slices/editFile'
import styles from '../CompanyForm/RegisterServices.module.css'

interface InputLogoProps {
  companyId: string
  logo: Image
}

const InputLogo: React.FC<InputLogoProps> = ({ companyId, logo }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [filename, setFilename] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
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
          style: 'error',
          text: 'El archivo pesa más de 5mb',
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
          style: 'error',
          text: 'No se ha seleccionado ningún archivo',
        }),
      )
    }

    const formData = new FormData()
    if (file) {
      formData.append('logo', file)
    }
    if (companyId) {
      formData.append('companyId', companyId)
    }

    try {
      await dispatch(editFile(formData))
      setSuccess(true)
    } catch (error) {
      console.log(error)
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  console.log(logo)

  return (
    <div className={styles.editImagesContainer}>
      <form onSubmit={handleUploadFile} encType="multipart/form-data">
        <Typography variant="h5">Logo</Typography>
        <Typography variant="body2">
          Debe pesar máximo 5mb y de preferencia ser cuadrada
        </Typography>
        <Typography variant="body1">Seleccionar archivo:</Typography>
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
          >
            Seleccionar logo
            <VisuallyHiddenInput
              type="file"
              accept=".jpg, .png, .webp"
              onChange={handleChangeFile}
            />
          </Button>
        </span>
        <span>
          <UploadButton loading={loading} success={success} type="submit" />
          <Typography variant="body1">Guardar imagen</Typography>
        </span>
      </form>
      <Card>
        {logo && logo.url && logo.url.trim() !== '' ? (
          <img src={logo.url} alt="logo" />
        ) : (
          <Typography>No tiene un logo guardado</Typography>
        )}
      </Card>
    </div>
  )
}

export default InputLogo
