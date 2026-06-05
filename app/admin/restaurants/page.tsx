import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Restaurant } from '@/types'

export default async function AdminRestaurantsPage() {
  const supabase = await createClient()

  const { data: restaurants } = await supabase
    .from('restaurants')
    .select('*')
    .order('name')

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-stone-900">Manage Restaurants</h1>
        <Link
          href="/admin/restaurants/new"
          className="bg-emerald-800 text-white px-6 py-2 rounded hover:bg-emerald-900 transition-colors"
        >
          Add Restaurant
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
        <table className="min-w-full divide-y divide-stone-200">
          <thead className="bg-stone-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Restaurant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Cuisine</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-stone-200">
            {restaurants?.map((restaurant: Restaurant) => (
              <tr key={restaurant.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded object-cover" src={restaurant.featured_image} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-stone-900">{restaurant.name}</div>
                      <div className="text-sm text-stone-500">{restaurant.address}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-stone-100 text-stone-800">
                    {restaurant.cuisine}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                  {restaurant.rating} / 5
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/admin/restaurants/edit/${restaurant.id}`} className="text-emerald-700 hover:text-emerald-900 mr-4">
                    Edit
                  </Link>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {(!restaurants || restaurants.length === 0) && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-stone-500 italic">
                  No restaurants found. Click "Add Restaurant" to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
