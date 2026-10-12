import { useEffect, useRef } from 'react'
import { Map as MapLibreMap, Marker, setWorkerUrl } from 'maplibre-gl'
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url'
import 'maplibre-gl/dist/maplibre-gl.css'
import styles from './LocationMap.module.css'

// Point MapLibre at its bundled worker; it can't resolve it on its own through Vite
setWorkerUrl(workerUrl)

// OpenFreeMap: free vector tiles, no API key or usage limits
const STYLE_URL = 'https://tiles.openfreemap.org/styles/positron'

// Road number shields only add clutter at street level
const hideRoadShields = (_previous, style) => ({
  ...style,
  layers: style.layers.filter((layer) => !layer.id.includes('shield')),
})

// On mobile the pin sits higher so it is not covered by the content below the map
const MOBILE_PIN_OFFSET = -55

function createMarkerElement(label) {
  const el = document.createElement('div')
  el.className = styles.markerWrapper

  const pulse = document.createElement('span')
  pulse.className = styles.markerPulse
  const dot = document.createElement('span')
  dot.className = styles.markerDot
  const tooltip = document.createElement('span')
  tooltip.className = styles.tooltip
  tooltip.textContent = label

  el.append(pulse, dot, tooltip)
  return el
}

export default function LocationMap({ position, zoom = 15, label = 'CHI Coffee' }) {
  const containerRef = useRef(null)
  const [lat, lng] = position

  useEffect(() => {
    const center = [lng, lat]
    const map = new MapLibreMap({
      container: containerRef.current,
      center,
      zoom,
      scrollZoom: false,
      dragRotate: false,
      pitchWithRotate: false,
      attributionControl: { compact: false },
    })
    map.setStyle(STYLE_URL, { transformStyle: hideRoadShields })
    map.touchZoomRotate.disableRotation()

    new Marker({ element: createMarkerElement(label) })
      .setLngLat(center)
      .addTo(map)

    const recenter = () => {
      map.resize()
      const offset = window.innerWidth <= 768 ? [0, MOBILE_PIN_OFFSET] : [0, 0]
      map.jumpTo({ center, zoom, offset })
    }
    map.once('load', recenter)
    window.addEventListener('resize', recenter)

    return () => {
      window.removeEventListener('resize', recenter)
      map.remove()
    }
  }, [lat, lng, zoom, label])

  return <div ref={containerRef} className={styles.map} />
}
