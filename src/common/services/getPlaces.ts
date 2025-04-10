import axios from 'axios'

export const getPlaces = async (query: string) => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
      {
        params: {
          access_token:
            'pk.eyJ1IjoiaWZjaSIsImEiOiJjbTZneXNla3UwNnNlMmpwbmRvbW9hY29zIn0.z6uQThQ45q7stY_RNDnmww',
          language: 'es', // Para obtener resultados en español
          country: 'ec', // Para priorizar resultados en Ecuador
          types: 'address', // Para buscar calles
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Error fetching places:', error)
    return null
  }
}
