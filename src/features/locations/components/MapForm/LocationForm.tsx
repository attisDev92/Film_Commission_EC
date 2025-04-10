import { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Card, Typography, Button } from '@mui/material'
import { AppDispatch } from '../../../../app/store/store'
import { editLocation } from '../../slices/editLocation'
import styles from './LocationForm.module.css'
import Map, { Marker, NavigationControl, MarkerDragEvent } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { LocationTypes } from '../../types/LocationTypes'

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN

interface MapboxContext {
  id: string
  text: string
}

const LocationForm = ({ location }: { location: LocationTypes }) => {
  const dispatch = useDispatch<AppDispatch>()

  const initialPosition = (() => {
    if (location?.coordinates) {
      return location.coordinates
    }
    return [-0.1807, -78.4678] as [number, number]
  })()

  const [position, setPosition] = useState<[number, number]>(initialPosition)
  const [address, setAddress] = useState(location?.address || '')
  const [city, setCity] = useState(location?.city || '')
  const [province, setProvince] = useState(location?.province || '')
  const [viewState, setViewState] = useState({
    latitude: initialPosition[0],
    longitude: initialPosition[1],
    zoom: 13,
  })

  useEffect(() => {
    if (location?.coordinates) {
      const coords = location.coordinates
      setPosition(coords)
      setViewState((prev) => ({
        ...prev,
        latitude: coords[0],
        longitude: coords[1],
      }))
    }
  }, [location])

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}`,
      )
      const data = await response.json()

      if (data.features && data.features.length > 0) {
        const place = data.features[0]
        const context = place.context || []

        // Extract address components
        const street = place.text || ''
        const cityObj = context.find((c: MapboxContext) =>
          c.id.includes('place'),
        )
        const provinceObj = context.find((c: MapboxContext) =>
          c.id.includes('region'),
        )

        setAddress(street)
        setCity(cityObj?.text || '')
        setProvince(provinceObj?.text || '')
      }
    } catch (error) {
      console.error('Error al obtener la dirección:', error)
    }
  }

  const handleMapClick = useCallback((e: mapboxgl.MapMouseEvent) => {
    const newPosition: [number, number] = [e.lngLat.lat, e.lngLat.lng]
    setPosition(newPosition)
    reverseGeocode(newPosition[0], newPosition[1])
  }, [])

  const handleMarkerDragEnd = useCallback((e: MarkerDragEvent) => {
    const newPosition: [number, number] = [e.lngLat.lat, e.lngLat.lng]
    setPosition(newPosition)
    reverseGeocode(newPosition[0], newPosition[1])
  }, [])

  const handleSave = async () => {
    if (!location) return

    try {
      await dispatch(
        editLocation({
          ...location,
          coordinates: position,
          address,
          city,
          province,
        }),
      )
      window.alert('Ubicación actualizada correctamente')
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

      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="address">Dirección</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Ingrese la dirección"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="city">Ciudad</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ingrese la ciudad"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="province">Provincia</label>
          <input
            id="province"
            type="text"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            placeholder="Ingrese la provincia"
          />
        </div>
      </div>

      <div className={styles.mapContainer}>
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          onClick={handleMapClick}
          mapboxAccessToken={mapboxToken}
        >
          <Marker
            latitude={position[0]}
            longitude={position[1]}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
          />
          <NavigationControl position="top-right" />
        </Map>
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
