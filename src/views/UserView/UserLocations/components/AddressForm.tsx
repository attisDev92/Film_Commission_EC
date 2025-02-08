import { Button } from '@mui/material'
import React from 'react'
import { AddressTypes } from './LocationForm'
import AutocompleteInput from './AutocompleteInput'
import TextInput from '../../../../components/FormikInputs/TextInput'

interface AddressFormProps {
  address: AddressTypes
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  setAddress: React.Dispatch<React.SetStateAction<AddressTypes>>
}

const AddressForm: React.FC<AddressFormProps> = ({
  address,
  onSubmit,
  setAddress,
}) => {
  const handleManualInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    stateProperty: keyof AddressTypes,
  ) => {
    const newAddress = { ...address }
    newAddress[stateProperty] = event.target.value
    setAddress(newAddress)
  }

  return (
    <form onSubmit={onSubmit}>
      <AutocompleteInput
        setAddress={setAddress}
        streetAndNumber={address.streetAndNumber}
        handleManualInputChange={handleManualInputChange}
      />
      <TextInput
        id="province"
        label="Provincia"
        type="text"
        placeholder="Provincia"
      />
      <TextInput id="ciudad" label="Ciudad" type="text" placeholder="Ciudad" />
      <Button type="submit" variant="contained">
        Guardar
      </Button>
    </form>
  )
}

export default AddressForm
