import { GlobalState } from '../Redux/store'
import { LocationTypes, User } from '../types'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

interface UseLocationsReturn {
  locations: LocationTypes[]
  location: LocationTypes | null
  loading: boolean
  error: string | null
}

// Función auxiliar para filtrar locaciones por userId
const filterLocationsByUserId = (
  locations: LocationTypes[],
  userId: string,
): LocationTypes[] => {
  return locations.filter((location) => location.userId === userId)
}

// Función auxiliar para encontrar una locación por ID
const findLocationById = (
  locations: LocationTypes[],
  locationId: string,
): LocationTypes | null => {
  const location = locations.find((loc) => loc.id === locationId)
  return location || null
}

export const useUserLocations = (locationId?: string): UseLocationsReturn => {
  const allLocations = useSelector<GlobalState, LocationTypes[]>(
    (state) => state.locations,
  )
  const user = useSelector<GlobalState, User>((state) => state.user)

  const [locations, setLocations] = useState<LocationTypes[]>([])
  const [location, setLocation] = useState<LocationTypes | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadUserLocations = () => {
      setLoading(true)
      setError(null)

      if (!allLocations || allLocations.length === 0) {
        setError('No se encontraron locaciones.')
        setLoading(false)
        return
      }

      if (!user || !user.id) {
        setError('El userId no está definido.')
        setLoading(false)
        return
      }

      const userLocations = filterLocationsByUserId(allLocations, user.id)

      if (userLocations.length === 0) {
        setError('El usuario no cuenta con locaciones registradas.')
      }

      setLocations(userLocations)
      setLoading(false)
    }

    loadUserLocations()
  }, [allLocations, user])

  useEffect(() => {
    if (locationId && locations.length > 0) {
      const locationSelected = findLocationById(locations, locationId)
      setLocation(locationSelected)
    }
  }, [locationId, locations])

  return {
    locations,
    location,
    loading,
    error,
  }
}

export const useLocations = (locationId?: string): UseLocationsReturn => {
  const allLocations = useSelector<GlobalState, LocationTypes[]>(
    (state) => state.locations,
  )

  const [location, setLocation] = useState<LocationTypes | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLocations = () => {
      setLoading(true)
      setError(null)

      if (!allLocations || allLocations.length === 0) {
        setError('No se encontraron locaciones.')
        setLoading(false)
        return
      }

      setLoading(false)
    }

    fetchLocations()
  }, [allLocations])

  useEffect(() => {
    if (locationId && allLocations.length > 0) {
      const locationSelected = findLocationById(allLocations, locationId)
      setLocation(locationSelected)
    }
  }, [locationId, allLocations])

  return {
    locations: allLocations,
    location,
    loading,
    error,
  }
}
