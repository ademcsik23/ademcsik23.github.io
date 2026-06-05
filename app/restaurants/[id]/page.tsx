'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Phone, Globe, Clock, Heart, Share2, ChevronLeft, ChevronRight, Navigation } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import RestaurantMap from '@/components/restaurant/RestaurantMap'
import RestaurantReviews from '@/components/restaurant/RestaurantReviews'

// Mock data for a single restaurant
const RESTAURANT_DATA = {
  id: '1',
  name: 'The Old Tappan Tavern',
  description: 'A local staple serving classic American comfort food with a modern twist. Great atmosphere and even better drinks. Our tavern features a warm, inviting interior with reclaimed wood accents and a cozy fireplace, making it the perfect spot for family dinners, casual drinks with friends, or special celebrations.',
  cuisine: 'American',
  address: '216 Old Tappan Rd, Old Tappan, NJ 07675',
  phone: '(201) 555-0123',
  website: 'https://oldtappantavern.com',
  rating: 4.8,
  price_range: '$$',
  hours: {
    'Monday': '11:00 AM - 10:00 PM',
    'Tuesday': '11:00 AM - 10:00 PM',
    'Wednesday': '11:00 AM - 10:00 PM',
    'Thursday': '11:00 AM - 11:00 PM',
    'Friday': '11:00 AM - 12:00 AM',
    'Saturday': '10:00 AM - 12:00 AM',
    'Sunday': '10:00 AM - 9:00 PM',
  },
  images: [
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200',
  ],
  popular_dishes: [
    { name: 'Tavern Burger', price: '$16', description: 'Custom blend patty, aged cheddar, caramelized onions, brioche bun.' },
    { name: 'Crispy Brussels Sprouts', price: '$12', description: 'Honey balsamic glaze, toasted pecans, dried cranberries.' },
    { name: 'Lobster Mac & Cheese', price: '$24', description: 'Fresh Maine lobster, four-cheese blend, herb breadcrumbs.' },
  ]
}

export default function RestaurantDetailPage() {
  const [activeImage, setActiveImage] = useState(0)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": RESTAURANT_DATA.name,
    "image": RESTAURANT_DATA.images,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "216 Old Tappan Rd",
      "addressLocality": "Old Tappan",
      "addressRegion": "NJ",
      "postalCode": "07675",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.0187,
      "longitude": -73.9982
    },
    "url": RESTAURANT_DATA.website,
    "telephone": RESTAURANT_DATA.phone,
    "servesCuisine": RESTAURANT_DATA.cuisine,
    "priceRange": RESTAURANT_DATA.price_range,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": RESTAURANT_DATA.rating,
      "reviewCount": 124
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
            <span className="text-dark-green font-medium">{RESTAURANT_DATA.name}</span>
          </nav>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative h-[400px] md:h-[500px] w-full bg-black">
        <Image
          src={RESTAURANT_DATA.images[activeImage]}
          alt={RESTAURANT_DATA.name}
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
                  {RESTAURANT_DATA.cuisine}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  {RESTAURANT_DATA.name}
                </h1>
                <div className="mt-4 flex items-center gap-6 text-white">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-gold fill-gold mr-1.5" />
                    <span className="font-bold text-lg">{RESTAURANT_DATA.rating}</span>
                    <span className="ml-1 text-white/70 text-sm">(124 reviews)</span>
                  </div>
                  <div className="font-medium text-lg">{RESTAURANT_DATA.price_range}</div>
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

        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
          <button
            onClick={() => setActiveImage((prev) => (prev === 0 ? RESTAURANT_DATA.images.length - 1 : prev - 1))}
            className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => setActiveImage((prev) => (prev === RESTAURANT_DATA.images.length - 1 ? 0 : prev + 1))}
            className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-dark-green mb-4">About</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {RESTAURANT_DATA.description}
              </p>
            </section>

            {/* Map Integration */}
            <section>
              <h2 className="text-2xl font-bold text-dark-green mb-4">Location</h2>
              <div className="h-80 w-full rounded-2xl overflow-hidden border border-cream-dark shadow-sm relative group">
                <RestaurantMap lat={41.0187} lng={-73.9982} />
                <div className="absolute bottom-4 right-4 transition-transform group-hover:scale-105">
                  <Button variant="secondary" className="shadow-lg border-cream-dark">
                    <Navigation className="h-4 w-4 mr-2" /> Get Directions
                  </Button>
                </div>
              </div>
            </section>

            {/* Popular Dishes */}
            <section>
              <h2 className="text-2xl font-bold text-dark-green mb-6">Popular Dishes</h2>
              <div className="space-y-6">
                {RESTAURANT_DATA.popular_dishes.map((dish) => (
                  <div key={dish.name} className="flex justify-between items-start border-b border-cream-dark pb-6">
                    <div>
                      <h3 className="text-lg font-bold text-dark-green">{dish.name}</h3>
                      <p className="mt-1 text-sm text-gray-600">{dish.description}</p>
                    </div>
                    <span className="font-bold text-dark-green">{dish.price}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-8 w-full">View Full Menu</Button>
            </section>

            {/* Reviews */}
            <RestaurantReviews />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-cream-dark shadow-sm sticky top-32">
              <h3 className="text-lg font-bold text-dark-green mb-6">Info & Hours</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{RESTAURANT_DATA.address}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{RESTAURANT_DATA.phone}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                  <a href={RESTAURANT_DATA.website} target="_blank" rel="noopener noreferrer" className="text-sm text-dark-green font-medium hover:underline">
                    Visit Website
                  </a>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                  <h4 className="text-sm font-bold text-dark-green">Opening Hours</h4>
                </div>
                <div className="space-y-2">
                  {Object.entries(RESTAURANT_DATA.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="text-gray-500">{day}</span>
                      <span className="text-dark-green font-medium">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

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
