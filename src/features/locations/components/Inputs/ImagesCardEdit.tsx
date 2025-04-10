import { useState } from 'react'
import DeleteButton from '../../../../common/components/Buttons/DeleteFileButton'
import { ImageListItem } from '@mui/material'
import { Image } from '../../../../common/types/types'
interface ImagesCardEditProps {
  item: Image
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
        handleClick={() => handleDelete(item._id || '')}
        success={false}
        type="button"
      />
    </ImageListItem>
  )
}

export default ImagesCardEdit
