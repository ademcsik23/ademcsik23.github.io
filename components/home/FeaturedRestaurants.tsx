import Link from 'next/link'
import RestaurantCard from '@/components/restaurant/RestaurantCard'
import { Button } from '@/components/ui/Button'
import { ChevronRight } from 'lucide-react'

// Mock data for initial development
const FEATURED_RESTAURANTS = [
  {
    id: '1',
    name: 'The Old Tappan Tavern',
    cuisine: 'American',
    rating: 4.8,
    price_range: '$$',
    address: '216 Old Tappan Rd',
    description: 'A local staple serving classic American comfort food with a modern twist. Great atmosphere and even better drinks.',
    featured_image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    name: 'Patisserie Florentine',
    cuisine: 'Bakery',
    rating: 4.9,
    price_range: '$',
    address: '188 Central Ave',
    description: 'Authentic French pastries and artisan coffee in the heart of Old Tappan. The croissants are a must-try.',
    featured_image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    name: 'Il Forno',
    cuisine: 'Italian',
    rating: 4.7,
    price_range: '$$$',
    address: '45 Bi-State Plaza',
    description: 'Upscale Italian dining featuring handmade pasta and wood-fired pizzas. Perfect for date night.',
    featured_image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800',
  },
]

export default function FeaturedRestaurants() {
  return (
    <section className="py-16 sm:py-24 bg-cream-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-dark-green sm:text-4xl">Featured Spots</h2>
            <p className="mt-2 text-lg text-gray-600">The most talked-about restaurants this month.</p>
          </div>
          <Link href="/restaurants">
            <Button variant="ghost" className="hidden sm:flex items-center text-gold font-bold">
              View all <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_RESTAURANTS.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link href="/restaurants">
            <Button variant="outline" className="w-full">View all restaurants</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
