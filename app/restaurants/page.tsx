'use client'

import { useState, useMemo } from 'react'
import RestaurantCard from '@/components/restaurant/RestaurantCard'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { cn } from '@/lib/utils'

// Extended Mock data for Restaurants Page
const ALL_RESTAURANTS = [
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
  {
    id: '4',
    name: 'Sushi House',
    cuisine: 'Japanese',
    rating: 4.6,
    price_range: '$$',
    address: '200 Old Tappan Rd',
    description: 'Fresh sushi, sashimi and Japanese specialties served in a serene environment.',
    featured_image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '5',
    name: 'Old Tappan Pizza',
    cuisine: 'Pizza',
    rating: 4.5,
    price_range: '$',
    address: '150 Old Tappan Rd',
    description: 'Classic Jersey-style pizza, calzones and heroes. A family favorite for decades.',
    featured_image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '6',
    name: 'Cousins Deli',
    cuisine: 'Deli',
    rating: 4.7,
    price_range: '$',
    address: '185 Central Ave',
    description: 'Massive sandwiches, fresh salads and daily specials. The best spot for a quick lunch.',
    featured_image: 'https://images.unsplash.com/photo-1509722747041-619f392e9240?auto=format&fit=crop&q=80&w=800',
  },
]

const CUISINES = Array.from(new Set(ALL_RESTAURANTS.map(r => r.cuisine)))
const PRICES = ['$', '$$', '$$$', '$$$$']

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [selectedPrices, setSelectedPrices] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('recommended')
  const [showFilters, setShowFilters] = useState(false)

  const filteredRestaurants = useMemo(() => {
    return ALL_RESTAURANTS.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCuisine = selectedCuisines.length === 0 || selectedCuisines.includes(restaurant.cuisine)
      const matchesPrice = selectedPrices.length === 0 || selectedPrices.includes(restaurant.price_range)

      return matchesSearch && matchesCuisine && matchesPrice
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'price-asc') return a.price_range.length - b.price_range.length
      if (sortBy === 'price-desc') return b.price_range.length - a.price_range.length
      return 0
    })
  }, [searchQuery, selectedCuisines, selectedPrices, sortBy])

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]
    )
  }

  const togglePrice = (price: string) => {
    setSelectedPrices(prev =>
      prev.includes(price) ? prev.filter(p => p !== price) : [...prev, price]
    )
  }

  const clearFilters = () => {
    setSelectedCuisines([])
    setSelectedPrices([])
    setSearchQuery('')
  }

  return (
    <div className="bg-cream-light min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-cream-dark py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-dark-green">All Restaurants</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover all the amazing food spots Old Tappan has to offer. Filter by cuisine, price, or rating.
          </p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-cream-dark py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search restaurants..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark-green"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              <Button
                variant={showFilters ? 'primary' : 'outline'}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
                {(selectedCuisines.length > 0 || selectedPrices.length > 0) && (
                  <span className="ml-2 bg-gold text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {selectedCuisines.length + selectedPrices.length}
                  </span>
                )}
              </Button>
              {CUISINES.slice(0, 3).map(cuisine => (
                <Button
                  key={cuisine}
                  variant={selectedCuisines.includes(cuisine) ? 'gold' : 'secondary'}
                  size="sm"
                  className="whitespace-nowrap"
                  onClick={() => toggleCuisine(cuisine)}
                >
                  {cuisine}
                </Button>
              ))}
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-cream-dark grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-200">
              <div>
                <h3 className="text-sm font-bold text-dark-green mb-3 uppercase tracking-wider">Cuisine</h3>
                <div className="flex flex-wrap gap-2">
                  {CUISINES.map(cuisine => (
                    <button
                      key={cuisine}
                      onClick={() => toggleCuisine(cuisine)}
                      className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium transition-colors border",
                        selectedCuisines.includes(cuisine)
                          ? "bg-dark-green text-white border-dark-green"
                          : "bg-cream-light text-dark-green border-cream-dark hover:border-gold"
                      )}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-dark-green mb-3 uppercase tracking-wider">Price Range</h3>
                <div className="flex gap-2">
                  {PRICES.map(price => (
                    <button
                      key={price}
                      onClick={() => togglePrice(price)}
                      className={cn(
                        "w-12 h-10 rounded-md font-bold transition-colors border flex items-center justify-center",
                        selectedPrices.includes(price)
                          ? "bg-dark-green text-white border-dark-green"
                          : "bg-cream-light text-dark-green border-cream-dark hover:border-gold"
                      )}
                    >
                      {price}
                    </button>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end gap-4 border-t border-cream-dark pt-4">
                <Button variant="ghost" size="sm" onClick={clearFilters}>Clear All</Button>
                <Button variant="primary" size="sm" onClick={() => setShowFilters(false)}>Show {filteredRestaurants.length} results</Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-gray-500">
            Showing <span className="font-bold text-dark-green">{filteredRestaurants.length}</span> results
          </p>
          <div className="flex items-center">
            <label className="text-sm text-gray-500 mr-2">Sort by:</label>
            <select
              className="bg-transparent text-sm font-medium text-dark-green border-none focus:ring-0 cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="bg-cream p-6 rounded-full inline-block mb-4">
              <Search className="h-12 w-12 text-dark-green opacity-20" />
            </div>
            <h3 className="text-xl font-bold text-dark-green">No restaurants found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your filters or search query.</p>
            <Button variant="outline" className="mt-6" onClick={clearFilters}>Clear all filters</Button>
          </div>
        )}
      </div>
    </div>
  )
}
