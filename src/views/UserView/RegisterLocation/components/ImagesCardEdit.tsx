import { useState } from 'react'
import DeleteButton from '../../../../components/Buttons/DeleteFileButton'
import { ImageListItem } from '@mui/material'

interface ImagesCardEditProps {
  item: {
    url: string
    _id: string
  }
  deleteImageFunc: (fieldId: string) => void
}

const ImagesCardEdit: React.FC<ImagesCardEditProps> = ({
  item,
  deleteImageFunc,
}) => {
  const [loading, setLoading] = useState(false)

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
        handleClick={() => handleDelete(item._id)}
        success={false}
        type="button"
      />
    </ImageListItem>
  )
}

export default ImagesCardEdit
