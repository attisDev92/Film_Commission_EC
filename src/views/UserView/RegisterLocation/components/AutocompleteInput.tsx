import React, { useState } from 'react'
import { getPlaces } from '../../../../api/getPlaces'
import { AddressTypes } from './LocationForm'
import TextInput from '../../../../components/FormikInputs/TextInput'

interface AutocompleteInputProps {
  handleManualInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    stateProperty: keyof AddressTypes,
  ) => void
  setAddress: React.Dispatch<React.SetStateAction<AddressTypes>>
  streetAndNumber: string
}

interface Suggestion {
  place_name: string
  center: number[]
  context: Array<{ id: string; text: string }>
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  handleManualInputChange,
  setAddress,
  streetAndNumber,
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleManualInputChange(event, 'streetAndNumber')
    handleInputChange(event.target.value)
  }

  const handleInputChange = async (query: string) => {
    const response = await getPlaces(query)
    setSuggestions(response.features)
  }

  const handleSuggestionClick = (suggestion: Suggestion) => {
    const streetAndNumber = suggestion.place_name.split(',')[0]
    const latitude = suggestion.center[1]
    const longitude = suggestion.center[0]

    const address = {
      streetAndNumber,
      place: '',
      region: '',
      postcode: '',
      country: '',
      latitude,
      longitude,
    }

    suggestion.context.forEach((element) => {
      const identifier = element.id.split('.')[0]
      // @ts-expect-error temporaly
      address[identifier] = element.text
    })

    setAddress(address)
    setSuggestions([])
  }

  return (
    <div>
      <TextInput
        type="text"
        id="address"
        placeholder="Dirección"
        //@ts-expect-error value is necessary
        value={streetAndNumber}
        onChange={handleChange}
      />
      <ul>
        {suggestions?.map((suggestion, Index) => (
          <li key={Index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion.place_name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AutocompleteInput
