'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useMemo, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
import { Star } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Restaurant } from '@/types'

const containerStyle = {
  width: '100%',
  height: '100%'
}

const center = {
  lat: 41.0187,
  lng: -73.9982
}

export default function MapPage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  })

  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const supabase = createClient()

  useEffect(() => {
    async function loadRestaurants() {
      if (typeof supabase.from !== 'function') return
      const { data } = await supabase.from('restaurants').select('*')
      if (data) setRestaurants(data)
    }
    loadRestaurants()
  }, [supabase])

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(r =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, restaurants])

  if (!isLoaded) return <div className="h-screen w-full flex items-center justify-center">Loading Maps...</div>

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col relative">
      {/* Sidebar / Overlay UI */}
      <div className="absolute top-4 left-4 z-10 w-full max-w-sm px-4 sm:px-0">
        <div className="bg-white rounded-2xl shadow-xl border border-cream-dark p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or cuisine..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex-grow">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          options={{
            disableDefaultUI: false,
            clickableIcons: false,
            styles: [
                {
                  "featureType": "poi.business",
                  "stylers": [{ "visibility": "off" }]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "labels.text",
                  "stylers": [{ "visibility": "on" }]
                }
              ]
          }}
        >
          {filteredRestaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
              onClick={() => setSelectedRestaurant(restaurant)}
            />
          ))}

          {selectedRestaurant && (
            <InfoWindow
              position={{ lat: selectedRestaurant.latitude, lng: selectedRestaurant.longitude }}
              onCloseClick={() => setSelectedRestaurant(null)}
            >
              <div className="p-1 max-w-[200px]">
                <div className="relative h-24 w-full rounded-lg overflow-hidden mb-2">
                  <Image
                    src={selectedRestaurant.featured_image}
                    alt={selectedRestaurant.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold text-dark-green text-sm">{selectedRestaurant.name}</h3>
                <div className="flex items-center text-xs mt-1">
                  <Star className="h-3 w-3 fill-gold text-gold mr-1" />
                  <span className="font-bold">{selectedRestaurant.rating}</span>
                  <span className="mx-1">•</span>
                  <span>{selectedRestaurant.cuisine}</span>
                </div>
                <Link href={`/restaurants/${selectedRestaurant.id}`} className="mt-3 block">
                  <Button size="sm" className="w-full text-[10px] h-7">View Page</Button>
                </Link>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  )
}
