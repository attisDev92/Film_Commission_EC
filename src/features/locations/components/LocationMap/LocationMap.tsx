import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import styles from './LocationMap.module.css'

interface LocationMapProps {
  coordinates: [number, number]
}

const LocationMap: React.FC<LocationMapProps> = ({ coordinates }) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const marker = useRef<mapboxgl.Marker | null>(null)

  useEffect(() => {
    if (!mapContainer.current || !coordinates) return

    const [lat, lng] = coordinates

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || ''

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: 14,
      interactive: true,
      dragPan: true,
      scrollZoom: true,
      doubleClickZoom: true,
      touchZoomRotate: true,
    })

    // Add marker
    marker.current = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map.current)

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [coordinates])

  return (
    <div className={styles.mapContainer}>
      <div ref={mapContainer} className={styles.map} />
    </div>
  )
}

export default LocationMap
