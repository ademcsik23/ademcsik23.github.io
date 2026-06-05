'use client'

import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useMemo } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
import { Star } from 'lucide-react'

const containerStyle = {
  width: '100%',
  height: '100%'
}

const center = {
  lat: 41.0187,
  lng: -73.9982
}

const RESTAURANTS = [
  {
    id: '1',
    name: 'The Old Tappan Tavern',
    cuisine: 'American',
    rating: 4.8,
    price_range: '$$',
    lat: 41.0187,
    lng: -73.9982,
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '2',
    name: 'Patisserie Florentine',
    cuisine: 'Bakery',
    rating: 4.9,
    price_range: '$',
    lat: 41.0215,
    lng: -73.9945,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '3',
    name: 'Il Forno',
    cuisine: 'Italian',
    rating: 4.7,
    price_range: '$$$',
    lat: 41.0155,
    lng: -73.9912,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=200',
  },
]

export default function MapPage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  })

  const [selectedRestaurant, setSelectedRestaurant] = useState<typeof RESTAURANTS[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter(r =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

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
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">Cuisine</Button>
            <Button variant="outline" size="sm" className="flex-1">Rating</Button>
            <Button variant="outline" size="sm" className="flex-1">Price</Button>
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
              position={{ lat: restaurant.lat, lng: restaurant.lng }}
              onClick={() => setSelectedRestaurant(restaurant)}
            />
          ))}

          {selectedRestaurant && (
            <InfoWindow
              position={{ lat: selectedRestaurant.lat, lng: selectedRestaurant.lng }}
              onCloseClick={() => setSelectedRestaurant(null)}
            >
              <div className="p-1 max-w-[200px]">
                <div className="relative h-24 w-full rounded-lg overflow-hidden mb-2">
                  <Image
                    src={selectedRestaurant.image}
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

      {/* Floating Result List (Mobile) */}
      <div className="absolute bottom-8 left-0 w-full px-4 md:hidden pointer-events-none">
          {/* Add a horizontal carousel of restaurant cards here later */}
      </div>
    </div>
  )
}
