import Link from 'next/link'
import Image from 'next/image'
import { Star, Heart, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface RestaurantCardProps {
  restaurant: {
    id: string
    name: string
    cuisine: string
    rating: number
    price_range: string
    address: string
    description: string
    featured_image: string
  }
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md border border-cream-dark">
      <Link href={`/restaurants/${restaurant.id}`} className="block relative h-48 w-full overflow-hidden">
        <Image
          src={restaurant.featured_image || '/placeholder-food.jpg'}
          alt={restaurant.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Button variant="secondary" size="sm" className="rounded-full p-2 h-auto">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold">{restaurant.cuisine}</span>
          <div className="flex items-center text-sm font-medium text-dark-green">
            <Star className="h-4 w-4 fill-gold text-gold mr-1" />
            {restaurant.rating}
          </div>
        </div>
        <Link href={`/restaurants/${restaurant.id}`}>
          <h3 className="mt-1 text-lg font-bold text-dark-green group-hover:text-gold transition-colors line-clamp-1">
            {restaurant.name}
          </h3>
        </Link>
        <div className="mt-1 flex items-center text-sm text-gray-500">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="line-clamp-1">{restaurant.address}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {restaurant.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-bold text-dark-green">{restaurant.price_range}</span>
          <Link href={`/restaurants/${restaurant.id}`}>
            <Button variant="outline" size="sm">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
