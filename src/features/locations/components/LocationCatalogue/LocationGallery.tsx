import LocationCard from '../LocationCard/LocationCard'
import styles from './LocationGallery.module.css'
import { useLocations } from '../../hooks/useLocations'
import { useEffect, useState } from 'react'
import { LocationTypes } from '../../types/LocationTypes'
import BackgroundAnimateLines from '../../../../common/components/BackgroundLinesAnimate/BackgroundAnimateLines'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'

const LocationGallery = () => {
  const { locations, loading, error } = useLocations()
  const [locationsList, setLocationsList] = useState<LocationTypes[]>([])

  useEffect(() => {
    if (locations && locations.length > 0) {
      const locationsList = locations.filter((location) => location.public)
      setLocationsList(locationsList)
    }
  }, [locations])

  if (loading) return null

  if (error)
    return (
      <div className={styles.locationGallery}>
        <div className={styles.errorContainer}>
          <Typography variant="h6">Error al cargar las locaciones</Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </Button>
        </div>
      </div>
    )

  return (
    <div className={styles.locationGallery}>
      <Typography variant="h3" color="primary">
        Locaciones
      </Typography>
      <div className={styles.galleryContainer}>
        {locationsList &&
          locationsList.map((location: LocationTypes) => (
            <LocationCard key={location?.id} location={location} />
          ))}
      </div>
      <div className={styles.backgroundLines}>
        <BackgroundAnimateLines />
      </div>
    </div>
  )
}

export default LocationGallery
