'use client'

import { useState } from 'react'
import { User, Heart, Star, Settings, LogOut, Camera, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import RestaurantCard from '@/components/restaurant/RestaurantCard'
import { cn } from '@/lib/utils'

const SAVED_RESTAURANTS = [
  {
    id: '1',
    name: 'The Old Tappan Tavern',
    cuisine: 'American',
    rating: 4.8,
    price_range: '$$',
    address: '216 Old Tappan Rd',
    description: 'A local staple serving classic American comfort food with a modern twist.',
    featured_image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    name: 'Il Forno',
    cuisine: 'Italian',
    rating: 4.7,
    price_range: '$$$',
    address: '45 Bi-State Plaza',
    description: 'Upscale Italian dining featuring handmade pasta and wood-fired pizzas.',
    featured_image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800',
  },
]

const TABS = [
  { id: 'favorites', name: 'Favorites', icon: Heart },
  { id: 'reviews', name: 'My Reviews', icon: Star },
  { id: 'photos', name: 'My Photos', icon: Camera },
  { id: 'settings', name: 'Settings', icon: Settings },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('favorites')

  return (
    <div className="bg-cream-light min-h-screen">
      <div className="bg-white border-b border-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative h-24 w-24 rounded-full bg-cream border-2 border-gold overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <User className="h-12 w-12 text-dark-green" />
              </div>
            </div>
            <div className="text-center md:text-left flex-grow">
              <h1 className="text-3xl font-bold text-dark-green">Welcome back, Andrew</h1>
              <p className="text-gray-600">Old Tappan Resident • Food Enthusiast</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Tabs */}
          <aside className="w-full lg:w-64 space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-colors",
                  activeTab === tab.id
                    ? "bg-dark-green text-white"
                    : "text-dark-green hover:bg-white border border-transparent hover:border-cream-dark"
                )}
              >
                <tab.icon className={cn("h-5 w-5 mr-3", activeTab === tab.id ? "text-gold" : "text-gray-400")} />
                {tab.name}
              </button>
            ))}
          </aside>

          {/* Main Content */}
          <main className="flex-grow">
            {activeTab === 'favorites' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-dark-green">Your Favorites</h2>
                  <Button variant="ghost" className="text-gold font-bold">Manage Wishlists</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {SAVED_RESTAURANTS.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                  <button className="border-2 border-dashed border-cream-dark rounded-xl h-full min-h-[300px] flex flex-col items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all group">
                    <div className="p-4 rounded-full bg-cream group-hover:bg-gold/10 mb-4">
                      <Plus className="h-8 w-8" />
                    </div>
                    <span className="font-bold">Add New Favorite</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-24 bg-white rounded-2xl border border-cream-dark">
                <Star className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-bold text-dark-green">No reviews yet</h3>
                <p className="text-gray-500">Your culinary opinions matter! Start reviewing restaurants to see them here.</p>
                <Button variant="outline" className="mt-6">Explore Restaurants</Button>
              </div>
            )}

            {activeTab === 'photos' && (
              <div className="text-center py-24 bg-white rounded-2xl border border-cream-dark">
                <Camera className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-bold text-dark-green">No photos uploaded</h3>
                <p className="text-gray-500">Share your food photography with the community.</p>
                <Button variant="outline" className="mt-6">Upload a Photo</Button>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl border border-cream-dark p-8 space-y-8">
                <h2 className="text-2xl font-bold text-dark-green">Profile Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-dark-green uppercase">Display Name</label>
                    <input type="text" defaultValue="Andrew Demcsik" className="w-full rounded-md border border-cream-dark px-4 py-2" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-dark-green uppercase">Email Address</label>
                    <input type="email" defaultValue="andrew@example.com" className="w-full rounded-md border border-cream-dark px-4 py-2" />
                  </div>
                </div>
                <div className="pt-4 border-t border-cream-dark flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
