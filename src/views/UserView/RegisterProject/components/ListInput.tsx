import { TextField, Button, Chip } from '@mui/material'
import { FormikProps } from 'formik'
import { useState } from 'react'
import { AudiovisualProject } from '../../../../types'

interface ListInputProps {
  id: string
  label: string
  placeholder: string
  formik: FormikProps<AudiovisualProject>
}

const ListInput: React.FC<ListInputProps> = ({
  formik,
  id,
  label,
  placeholder,
}) => {
  const [item, setItem] = useState<string>('')
  const [items, setItems] = useState<string[]>([])

  const handleAdditem = () => {
    if (!item.trim()) {
      formik.setFieldError('recognoitions', 'El iteme no puede estar vacío')
      return
    }

    if (items.includes(item.trim())) {
      formik.setFieldError('recognitions', 'Este iteme ya fue agregado')
      return
    }

    setItems([...items, item.trim()])
    formik.setFieldValue('recognitions', [...items, item.trim()])
    setItem('')
    formik.setFieldError('recognitions', '')
  }

  const handleRemoveitem = (itemToRemove: string) => {
    const updateditems = items.filter((item) => item !== itemToRemove)
    setItems(updateditems)
    formik.setFieldValue('recognitios', updateditems)
  }

  return (
    <>
      <span>
        <TextField
          id={id}
          label={label}
          value={item}
          onChange={({ target }) => setItem(target.value)}
          placeholder={placeholder}
          error={Boolean(formik.errors.recognitions)}
          helperText={formik.errors.recognitions}
          fullWidth
        />
        <Button variant="contained" onClick={handleAdditem}>
          Agregar reconocimiento
        </Button>
      </span>
      <div>
        {items.map((item, index) => (
          <Chip
            key={index}
            label={item}
            onDelete={() => handleRemoveitem(item)}
            sx={{ m: 0.5 }}
          />
        ))}
      </div>
    </>
  )
}

export default ListInput
