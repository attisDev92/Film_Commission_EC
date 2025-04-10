import { TextField, Button, Chip } from '@mui/material'
import { FormikProps } from 'formik'
import { useState } from 'react'
import { CompanyServiceType } from '../../../features/companies/types/CompanyServiceType'

interface ListInputProps {
  id: string
  label: string
  placeholder: string
  formik: FormikProps<CompanyServiceType>
}

const ListInput: React.FC<ListInputProps> = ({
  formik,
  id,
  label,
  placeholder,
}) => {
  const [client, setClient] = useState<string>('')
  const [clients, setClients] = useState<string[]>([])

  const handleAddClient = () => {
    if (!client.trim()) {
      formik.setFieldError('clients', 'El cliente no puede estar vacío')
      return
    }

    if (clients.includes(client.trim())) {
      formik.setFieldError('clients', 'Este cliente ya fue agregado')
      return
    }

    setClients([...clients, client.trim()])
    formik.setFieldValue('clients', [...clients, client.trim()])
    setClient('')
    formik.setFieldError('clients', '')
  }

  const handleRemoveClient = (clientToRemove: string) => {
    const updatedClients = clients.filter((client) => client !== clientToRemove)
    setClients(updatedClients)
    formik.setFieldValue('clients', updatedClients)
  }

  return (
    <>
      <span>
        <TextField
          id={id}
          label={label}
          value={client}
          onChange={({ target }) => setClient(target.value)}
          placeholder={placeholder}
          error={Boolean(formik.errors.clients)}
          helperText={formik.errors.clients}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddClient}>
          Agregar Cliente
        </Button>
      </span>
      <div>
        {clients.map((client, index) => (
          <Chip
            key={index}
            label={client}
            onDelete={() => handleRemoveClient(client)}
            sx={{ m: 0.5 }}
          />
        ))}
      </div>
    </>
  )
}

export default ListInput
