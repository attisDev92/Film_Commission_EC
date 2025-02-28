import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { useState } from 'react'
import EditButton from './EditButton'
import styles from './formikStyles.module.css'

interface EditFieldProps {
  label: string
  value?: string | string[] | boolean
  children: React.ReactNode
  onSave: (newValue: string | string[] | boolean) => void
  avatar?: React.ReactNode
}

const EditField: React.FC<EditFieldProps> = ({
  label,
  value,
  children,
  onSave,
  avatar,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const handleSave = () => {
    setIsEdit(false)
    if (onSave) {
      onSave(value || '')
    }
  }

  const formatValue = (value: string | string[] | boolean | undefined) => {
    if (Array.isArray(value)) {
      return value.join(', ')
    }
    if (value === true) {
      return 'Sí'
    }
    if (value === false) {
      return 'No'
    }
    if (value === undefined) {
      return ''
    }
    return value
  }

  return (
    <ListItem className={styles.editFieldContainer}>
      <ListItemAvatar>
        <Avatar>{avatar}</Avatar>
      </ListItemAvatar>

      {isEdit ? (
        <>{children}</>
      ) : (
        <ListItemText primary={label} secondary={formatValue(value)} />
      )}
      <EditButton isEdit={isEdit} setIsEdit={setIsEdit} onSave={handleSave} />
    </ListItem>
  )
}

export default EditField
