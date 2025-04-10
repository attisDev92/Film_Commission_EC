import { useEffect, useState } from 'react'
import Map, {
  Marker,
  NavigationControl,
  MarkerDragEvent,
  ScaleControl,
} from 'react-map-gl'
import LocationOnIcon from '@mui/icons-material/LocationOn'

interface MapBoxProps {
  latitude: number
  longitude: number
  updateCoordinates: (latitude: number, longitude: number) => void
}

interface Viewport {
  latitude: number
  longitude: number
  zoom: number
}

interface MarkerState {
  latitude: number
  longitude: number
}

const MapBox: React.FC<MapBoxProps> = ({
  latitude,
  longitude,
  updateCoordinates,
}) => {
  const [viewport, setViewport] = useState<Viewport>({
    latitude,
    longitude,
    zoom: 16,
  })

  const [marker, setMarker] = useState<MarkerState>({
    latitude,
    longitude,
  })

  useEffect(() => {
    setViewport((oldViwport) => ({ ...oldViwport, latitude, longitude }))
    setMarker({ latitude, longitude })
  }, [latitude, longitude])

  const handleMarkerDrag = (event: MarkerDragEvent) => {
    const newLatitude = event.lngLat.lat
    const newLongitude = event.lngLat.lng
    setMarker({ latitude: newLatitude, longitude: newLongitude })
    updateCoordinates(newLatitude, newLongitude)
  }

  return (
    <div style={{ height: '50vh' }}>
      <Map
        initialViewState={viewport}
        mapboxAccessToken="pk.eyJ1IjoiaWZjaSIsImEiOiJjbTZneXNla3UwNnNlMmpwbmRvbW9hY29zIn0.z6uQThQ45q7stY_RNDnmww"
        mapStyle="mapbox://styles/ifci/cm6i5yosj003m01ry9rzm93ee"
        cursor="pointer"
        onMove={(event) => {
          setViewport(event.viewState)
        }}
      >
        <Marker
          anchor="bottom"
          latitude={marker.latitude}
          longitude={marker.longitude}
          draggable={true}
          onDragEnd={handleMarkerDrag}
        >
          <LocationOnIcon sx={{ fontSize: 40, color: '#9d00e6' }} />
        </Marker>
        <NavigationControl />
        <ScaleControl />
      </Map>
    </div>
  )
}

export default MapBox
