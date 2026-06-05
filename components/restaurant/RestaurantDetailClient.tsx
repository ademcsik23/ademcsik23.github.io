'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Phone, Globe, Clock, Heart, Share2, ChevronLeft, ChevronRight, Navigation } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import RestaurantMap from '@/components/restaurant/RestaurantMap'
import RestaurantReviews from '@/components/restaurant/RestaurantReviews'
import { Restaurant, Review } from '@/types'

interface RestaurantDetailClientProps {
  restaurant: Restaurant
  reviews: Review[]
}

export default function RestaurantDetailClient({ restaurant, reviews }: RestaurantDetailClientProps) {
  const [activeImage, setActiveImage] = useState(0)

  // Use featured_image as the primary image, and mock others if needed
  const images = [restaurant.featured_image]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": restaurant.name,
    "image": images,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": restaurant.address,
      "addressLocality": "Old Tappan",
      "addressRegion": "NJ",
      "postalCode": "07675",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": restaurant.latitude,
      "longitude": restaurant.longitude
    },
    "url": restaurant.website,
    "telephone": restaurant.phone,
    "servesCuisine": restaurant.cuisine,
    "priceRange": restaurant.price_range,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": restaurant.rating,
      "reviewCount": reviews.length || 1
    }
  }

  return (
    <div className="bg-cream-light min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-cream-dark py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-dark-green">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/restaurants" className="hover:text-dark-green">Restaurants</Link>
            <span className="mx-2">/</span>
            <span className="text-dark-green font-medium">{restaurant.name}</span>
          </nav>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative h-[400px] md:h-[500px] w-full bg-black">
        <Image
          src={images[activeImage]}
          alt={restaurant.name}
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-gold text-white text-xs font-bold uppercase tracking-widest rounded-md mb-3">
                  {restaurant.cuisine}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  {restaurant.name}
                </h1>
                <div className="mt-4 flex items-center gap-6 text-white">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-gold fill-gold mr-1.5" />
                    <span className="font-bold text-lg">{restaurant.rating}</span>
                    <span className="ml-1 text-white/70 text-sm">({reviews.length} reviews)</span>
                  </div>
                  <div className="font-medium text-lg">{restaurant.price_range}</div>
                </div>
              </div>
              <div className="hidden md:flex gap-3">
                <Button variant="secondary" className="rounded-full shadow-lg">
                  <Heart className="h-5 w-5 mr-2" /> Save
                </Button>
                <Button variant="secondary" className="rounded-full shadow-lg">
                  <Share2 className="h-5 w-5 mr-2" /> Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {images.length > 1 && (
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
            <button
              onClick={() => setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-dark-green mb-4">About</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {restaurant.description}
              </p>
            </section>

            {/* Map Integration */}
            <section>
              <h2 className="text-2xl font-bold text-dark-green mb-4">Location</h2>
              <div className="h-80 w-full rounded-2xl overflow-hidden border border-cream-dark shadow-sm relative group">
                <RestaurantMap lat={restaurant.latitude} lng={restaurant.longitude} />
                <div className="absolute bottom-4 right-4 transition-transform group-hover:scale-105">
                  <Button variant="secondary" className="shadow-lg border-cream-dark">
                    <Navigation className="h-4 w-4 mr-2" /> Get Directions
                  </Button>
                </div>
              </div>
            </section>

            {/* Reviews */}
            <RestaurantReviews restaurantId={restaurant.id} initialReviews={reviews} />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-cream-dark shadow-sm sticky top-32">
              <h3 className="text-lg font-bold text-dark-green mb-6">Info & Hours</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{restaurant.address}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{restaurant.phone}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                  <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-sm text-dark-green font-medium hover:underline">
                    Visit Website
                  </a>
                </div>
              </div>

              {restaurant.hours && (
                <div className="mt-8">
                  <div className="flex items-center mb-4">
                    <Clock className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                    <h4 className="text-sm font-bold text-dark-green">Opening Hours</h4>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(restaurant.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between text-sm">
                        <span className="text-gray-500">{day}</span>
                        <span className="text-dark-green font-medium">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 pt-8 border-t border-cream-dark">
                <Button className="w-full mb-3" size="lg">Order Delivery</Button>
                <Button variant="outline" className="w-full" size="lg">Book a Table</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
