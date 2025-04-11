import { useState } from 'react'
import DeleteButton from '../Buttons/DeleteFileButton'
import { ImageListItem } from '@mui/material'
import { Image } from '../../types/types'
interface ImageCardEditProps {
  imageUrl: Image
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
    <ImageListItem style={{ width: '200px', height: '250px' }}>
      <div style={{ width: '200px', height: '200px', overflow: 'hidden' }}>
        <img
          src={imageUrl.url}
          alt="Location"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
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
