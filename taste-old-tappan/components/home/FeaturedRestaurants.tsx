import Link from 'next/link'
import RestaurantCard from '@/components/restaurant/RestaurantCard'
import { Button } from '@/components/ui/Button'
import { ChevronRight } from 'lucide-react'
import { Restaurant } from '@/types'

export default function FeaturedRestaurants({ restaurants }: { restaurants: Restaurant[] }) {
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
          {restaurants.map((restaurant) => (
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
