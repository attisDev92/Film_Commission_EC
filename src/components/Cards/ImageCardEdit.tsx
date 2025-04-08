import { useState } from 'react'
import DeleteButton from '../Buttons/DeleteFileButton'
import { ImageListItem } from '@mui/material'

interface ImageCardEditProps {
  imageUrl: string
  onDelete: () => void
}

const ImageCardEdit: React.FC<ImageCardEditProps> = ({
  imageUrl,
  onDelete,
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      await onDelete()
      setSuccess(true)
    } catch (error) {
      console.error('Error al eliminar la imagen:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ImageListItem>
      <img
        src={imageUrl}
        alt="Location"
        style={{ width: '100%', height: 'auto' }}
      />
      <DeleteButton
        loading={loading}
        success={success}
        label="Eliminar"
        handleClick={handleDelete}
        type="button"
      />
    </ImageListItem>
  )
}

export default ImageCardEdit
