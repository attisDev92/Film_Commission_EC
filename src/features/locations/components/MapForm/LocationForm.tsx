import { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Card, Typography, Button, CircularProgress } from '@mui/material'
import { AppDispatch } from '../../../../app/store/store'
import { editLocation } from '../../slices/editLocation'
import styles from './LocationForm.module.css'
import Map, { Marker, NavigationControl, MarkerDragEvent } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { LocationTypes } from '../../types/LocationTypes'
import AddressAutocomplete from './AddressAutocomplete'
import { MAPBOX_CONFIG } from '../../../../config/mapbox'

export interface MapboxContext {
  id: string
  text: string
}

// Coordenadas por defecto (Quito, Ecuador)
const DEFAULT_COORDINATES: [number, number] = [-0.1807, -78.4678]

const LocationForm = ({ location }: { location: LocationTypes }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [isLoading, setIsLoading] = useState(true)

  // Inicialización de estados con valores guardados
  const [position, setPosition] = useState<[number, number]>(() => {
    if (
      location?.coordinates &&
      Array.isArray(location.coordinates) &&
      location.coordinates.length === 2
    ) {
      return location.coordinates
    }
    return DEFAULT_COORDINATES
  })

  const [address, setAddress] = useState(() => location?.address ?? '')
  const [city, setCity] = useState(() => location?.city ?? '')
  const [province, setProvince] = useState(() => location?.province ?? '')

  const [viewState, setViewState] = useState(() => ({
    latitude: location?.coordinates?.[0] ?? DEFAULT_COORDINATES[0],
    longitude: location?.coordinates?.[1] ?? DEFAULT_COORDINATES[1],
    zoom: 13,
  }))

  // Función para validar coordenadas
  const validateCoordinates = (coordinates: [number, number]): boolean => {
    if (
      !coordinates ||
      !Array.isArray(coordinates) ||
      coordinates.length !== 2
    ) {
      return false
    }
    const [lat, lng] = coordinates
    return (
      typeof lat === 'number' &&
      !isNaN(lat) &&
      isFinite(lat) &&
      typeof lng === 'number' &&
      !isNaN(lng) &&
      isFinite(lng)
    )
  }

  // Efecto para manejar cambios en la ubicación
  useEffect(() => {
    if (location) {
      const savedCoordinates = location.coordinates
      if (savedCoordinates && validateCoordinates(savedCoordinates)) {
        setPosition(savedCoordinates)
        setViewState((prev) => ({
          ...prev,
          latitude: savedCoordinates[0],
          longitude: savedCoordinates[1],
        }))
      }
      setAddress(location.address ?? '')
      setCity(location.city ?? '')
      setProvince(location.province ?? '')
    }
    setIsLoading(false)
  }, [location])

  const handleAddressSelect = (
    newAddress: string,
    coordinates: [number, number],
    newCity: string,
    newProvince: string,
  ) => {
    if (validateCoordinates(coordinates)) {
      setPosition(coordinates)
      setViewState((prev) => ({
        ...prev,
        latitude: coordinates[0],
        longitude: coordinates[1],
      }))
      setAddress(newAddress)
      setCity(newCity)
      setProvince(newProvince)
    }
  }

  const handleMapClick = useCallback((e: mapboxgl.MapMouseEvent) => {
    const newPosition: [number, number] = [e.lngLat.lat, e.lngLat.lng]
    if (validateCoordinates(newPosition)) {
      setPosition(newPosition)
      setViewState((prev) => ({
        ...prev,
        latitude: newPosition[0],
        longitude: newPosition[1],
      }))
      reverseGeocode(newPosition[0], newPosition[1])
    }
  }, [])

  const handleMarkerDragEnd = useCallback((e: MarkerDragEvent) => {
    const newPosition: [number, number] = [e.lngLat.lat, e.lngLat.lng]
    if (validateCoordinates(newPosition)) {
      setPosition(newPosition)
      setViewState((prev) => ({
        ...prev,
        latitude: newPosition[0],
        longitude: newPosition[1],
      }))
      reverseGeocode(newPosition[0], newPosition[1])
    }
  }, [])

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_CONFIG.token}`,
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
          <AddressAutocomplete value={address} onChange={handleAddressSelect} />
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
        {isLoading ? (
          <div className={styles.loaderContainer}>
            <CircularProgress />
            <Typography variant="body2" style={{ marginTop: '1rem' }}>
              Cargando mapa...
            </Typography>
          </div>
        ) : (
          <Map
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            style={{ width: '100%', height: '100%' }}
            mapStyle={MAPBOX_CONFIG.style}
            onClick={handleMapClick}
            mapboxAccessToken={MAPBOX_CONFIG.token}
          >
            <Marker
              latitude={position[0]}
              longitude={position[1]}
              draggable={true}
              onDragEnd={handleMarkerDragEnd}
            />
            <NavigationControl position="top-right" />
          </Map>
        )}
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
