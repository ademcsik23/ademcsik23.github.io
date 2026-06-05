'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function NewRestaurantPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cuisine: '',
    address: '',
    phone: '',
    website: '',
    latitude: 40.99, // Old Tappan area
    longitude: -73.98,
    rating: 5,
    price_range: '$$',
    featured_image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from('restaurants')
      .insert([formData])

    setLoading(false)

    if (error) {
      alert('Error adding restaurant: ' + error.message)
    } else {
      router.push('/admin/restaurants')
      router.refresh()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'latitude' || name === 'longitude' || name === 'rating') ? parseFloat(value) : value
    }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">Add New Restaurant</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-stone-200 space-y-6">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Restaurant Name</label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-stone-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="The Old Tappan Grill"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Cuisine</label>
            <input
              required
              type="text"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stone-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Italian, Bakery, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Price Range</label>
            <select
              name="price_range"
              value={formData.price_range}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stone-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
              <option value="$$$$">$$$$</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Address</label>
          <input
            required
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-stone-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="123 Old Tappan Rd, Old Tappan, NJ 07675"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
          <textarea
            required
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-stone-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Featured Image URL</label>
          <input
            required
            type="url"
            name="featured_image"
            value={formData.featured_image}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-stone-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-stone-300 rounded text-stone-700 hover:bg-stone-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-emerald-800 text-white rounded hover:bg-emerald-900 disabled:bg-emerald-300"
          >
            {loading ? 'Adding...' : 'Add Restaurant'}
          </button>
        </div>
      </form>
    </div>
  )
}
