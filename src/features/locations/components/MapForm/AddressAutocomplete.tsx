import { useState, useCallback, useEffect, useRef } from 'react'
import { TextField, Autocomplete, CircularProgress } from '@mui/material'
import { MapboxContext } from './LocationForm'

interface AddressAutocompleteProps {
  value: string
  onChange: (
    address: string,
    coordinates: [number, number],
    city: string,
    province: string,
  ) => void
  onError?: (error: string) => void
}

interface Suggestion {
  place_name: string
  center: [number, number]
  context: MapboxContext[]
}

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN

const AddressAutocomplete = ({
  value,
  onChange,
  onError,
}: AddressAutocompleteProps) => {
  const [inputValue, setInputValue] = useState(value)
  const [options, setOptions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)
  const controllerRef = useRef<AbortController | null>(null)

  const fetchSuggestions = useCallback(
    async (query: string) => {
      if (!query) {
        setOptions([])
        return
      }

      try {
        setLoading(true)

        // Cancel previous request if exists
        if (controllerRef.current) {
          controllerRef.current.abort()
        }

        // Create new controller for this request
        controllerRef.current = new AbortController()

        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query,
          )}.json?access_token=${mapboxToken}&country=ec&types=address,place,locality,region`,
          { signal: controllerRef.current.signal },
        )

        const data = await response.json()

        if (data.features) {
          setOptions(
            data.features.map(
              (feature: {
                place_name: string
                center: [number, number]
                context: MapboxContext[]
              }) => ({
                place_name: feature.place_name,
                center: feature.center,
                context: feature.context,
              }),
            ),
          )
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          onError?.('Error al buscar direcciones')
          console.error('Error fetching suggestions:', error)
        }
      } finally {
        setLoading(false)
      }
    },
    [onError],
  )

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchSuggestions(inputValue)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [inputValue, fetchSuggestions])

  const handleChange = (
    _: React.SyntheticEvent,
    newValue: Suggestion | string | null,
  ) => {
    if (newValue && typeof newValue !== 'string') {
      // Extract city and province from context
      const cityObj = newValue.context?.find(
        (c) => c.id.includes('place') || c.id.includes('locality'),
      )
      const provinceObj = newValue.context?.find(
        (c) => c.id.includes('region') || c.id.includes('province'),
      )

      // Mapbox uses [longitude, latitude], we need to reverse it
      const coordinates: [number, number] = [
        newValue.center[1],
        newValue.center[0],
      ]

      // Extract city and province names
      const cityName = cityObj?.text || ''
      const provinceName = provinceObj?.text || ''

      // If we couldn't find city/province in context, try to extract from place_name
      const placeParts = newValue.place_name.split(',')
      const finalCity = cityName || placeParts[1]?.trim() || ''
      const finalProvince = provinceName || placeParts[2]?.trim() || ''

      onChange(newValue.place_name, coordinates, finalCity, finalProvince)
    }
  }

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.place_name
      }
      value={value}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Dirección"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )
}

export default AddressAutocomplete
