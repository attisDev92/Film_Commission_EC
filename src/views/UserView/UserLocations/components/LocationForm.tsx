import React, { useState } from 'react'
import MapBox from '../../../../components/Maps/MapBox'
import AddressForm from './AddressForm'

export interface AddressTypes {
  streetAndNumber: string
  place: string
  region: string
  postcode: string
  country: string
  latitude: number
  longitude: number
  [key: string]: string | number
}

const LocationForm: React.FC = () => {
  const ecuatorCoords = { latitude: -0.20098, longitude: -78.49073 }

  const [address, setAddress] = useState<AddressTypes>({
    streetAndNumber: '',
    place: '',
    region: '',
    postcode: '',
    country: '',
    latitude: ecuatorCoords.latitude,
    longitude: ecuatorCoords.longitude,
  })

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (address.streetAndNumber) {
      console.log('selected address: ', address)
    }
  }

  const updateCoordinates = (latitude: number, longitude: number) => {
    setAddress({ ...address, latitude, longitude })
  }

  return (
    <>
      <AddressForm
        onSubmit={handleFormSubmit}
        address={address}
        setAddress={setAddress}
      />
      <MapBox
        latitude={address.latitude}
        longitude={address.longitude}
        updateCoordinates={updateCoordinates}
      />
    </>
  )
}

export default LocationForm
