import { Button } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'

interface UploadButtonProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  loading?: boolean
  success?: boolean
}

const UploadButton: React.FC<UploadButtonProps> = ({
  onChange,
  loading = false,
  success = false,
}) => {
  return (
    <Button
      variant="contained"
      startIcon={<CloudUpload />}
      disabled={loading}
      color={success ? 'success' : 'primary'}
      component="label"
    >
      {loading ? 'Cargando...' : 'Seleccionar archivo'}
      <input
        type="file"
        accept=".jpg, .png, .webp"
        onChange={onChange}
        style={{ display: 'none' }}
      />
    </Button>
  )
}

export default UploadButton
