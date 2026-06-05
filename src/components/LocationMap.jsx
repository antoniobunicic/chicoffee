import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './LocationMap.module.css'

const POSITION = [45.80955, 15.97433]
const ZOOM = 16

const tileUrl =
  'https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png'

const markerIcon = L.divIcon({
  className: styles.markerWrapper,
  html: `<span class="${styles.markerDot}"></span><span class="${styles.markerPulse}"></span>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

export default function LocationMap() {
  return (
    <MapContainer
      center={POSITION}
      zoom={ZOOM}
      scrollWheelZoom={false}
      zoomControl={false}
      attributionControl={false}
      className={styles.map}
    >
      <TileLayer
        url={tileUrl}
        subdomains="abcd"
        maxZoom={20}
      />
      <Marker position={POSITION} icon={markerIcon}>
        <Tooltip
          direction="top"
          offset={[0, -10]}
          opacity={1}
          permanent
          className={styles.tooltip}
        >
          CHI Coffee
        </Tooltip>
      </Marker>
    </MapContainer>
  )
}
