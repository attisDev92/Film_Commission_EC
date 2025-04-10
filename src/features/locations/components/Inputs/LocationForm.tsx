import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Typography, Button } from '@mui/material'
import { AppDispatch, GlobalState } from '../../../../app/store/store'
import { editLocation } from '../../slices/editLocation'
import styles from './Inputs.module.css'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { LatLng } from 'leaflet'
import { LocationTypes } from '../../types/LocationTypes'

interface LocationFormProps {
  locationId: string
  coordinates: string[]
}

const LocationForm: React.FC<LocationFormProps> = ({
  locationId,
  coordinates,
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const location = useSelector<GlobalState, LocationTypes | undefined>(
    (state) => state.locations.find((loc) => loc.id === locationId),
  )
  const [position, setPosition] = useState<[number, number]>(() => {
    if (coordinates.length === 2) {
      return [parseFloat(coordinates[0]), parseFloat(coordinates[1])]
    }
    // Default coordinates (Ecuador)
    return [-0.1807, -78.4678]
  })

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng])
      },
    })
    return null
  }

  const handleSave = async () => {
    if (!location) return

    try {
      await dispatch(
        editLocation({
          ...location,
          coordinates: position.map(String),
        }),
      )
    } catch (error) {
      console.error('Error al guardar las coordenadas:', error)
    }
  }

  return (
    <Card className={styles.card}>
      <Typography variant="h6">Ubicación en el mapa</Typography>
      <Typography variant="body2" color="textSecondary">
        Haz clic en el mapa para seleccionar la ubicación exacta
      </Typography>
      <div style={{ height: '400px', width: '100%', marginTop: '1rem' }}>
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={new LatLng(position[0], position[1])} />
          <MapEvents />
        </MapContainer>
      </div>
      <Button
        variant="contained"
        onClick={handleSave}
        style={{ marginTop: '1rem' }}
      >
        Guardar ubicación
      </Button>
    </Card>
  )
}

export default LocationForm
