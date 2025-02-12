import { useState } from 'react'
import DeleteButton from '../Buttons/DeleteFileButton'
import { ImageListItem } from '@mui/material'
import { Image } from '../../types'

interface ImageCardEditProps {
  item: Image
  deleteImageFunc: (fileId: string) => void
}

const ImagesCardEdit: React.FC<ImageCardEditProps> = ({
  item,
  deleteImageFunc,
}) => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleDelete = (fileId: string) => {
    setLoading(true)
    deleteImageFunc(fileId)
  }

  return (
    <ImageListItem>
      <img src={item.url} />
      <DeleteButton
        loading={loading}
        label="Borrar"
        success={false}
        type="button"
        handleClick={() => item._id && handleDelete(item._id)}
      />
    </ImageListItem>
  )
}

export default ImagesCardEdit
