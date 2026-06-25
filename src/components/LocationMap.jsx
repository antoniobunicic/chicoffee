import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './LocationMap.module.css'

// Recalculate map size and recenter after layout/resize so the pin stays centred
function MapResizer({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    const fix = () => {
      map.invalidateSize()
      if (window.innerWidth <= 768) {
        // Raise the pin on mobile: shift the map centre south so the marker sits higher
        const pt = map.project(center, zoom).add([0, 55])
        map.setView(map.unproject(pt, zoom), zoom)
      } else {
        map.setView(center, zoom)
      }
    }
    const t = setTimeout(fix, 250)
    window.addEventListener('resize', fix)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', fix)
    }
  }, [map, center, zoom])
  return null
}

const tileUrl =
  'https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png'

const markerIcon = L.divIcon({
  className: styles.markerWrapper,
  html: `<span class="${styles.markerDot}"></span><span class="${styles.markerPulse}"></span>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

export default function LocationMap({ position, zoom = 16, label = 'CHI Coffee' }) {
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      zoomControl={false}
      attributionControl={false}
      className={styles.map}
    >
      <MapResizer center={position} zoom={zoom} />
      <TileLayer
        url={tileUrl}
        subdomains="abcd"
        maxZoom={20}
      />
      <Marker position={position} icon={markerIcon}>
        <Tooltip
          direction="top"
          offset={[0, -10]}
          opacity={1}
          permanent
          className={styles.tooltip}
        >
          {label}
        </Tooltip>
      </Marker>
    </MapContainer>
  )
}
