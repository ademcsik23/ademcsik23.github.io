'use client'

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { useCallback, useState } from 'react'

const containerStyle = {
  width: '100%',
  height: '100%'
}

interface MapProps {
  lat: number
  lng: number
  zoom?: number
}

export default function RestaurantMap({ lat, lng, zoom = 15 }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback(function callback(mapInstance: google.maps.Map) {
    setMap(mapInstance)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  if (!isLoaded) return <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center">Loading Map...</div>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat, lng }}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  )
}
