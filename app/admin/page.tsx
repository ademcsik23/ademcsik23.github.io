import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // In a real production app, we would check for admin role here
  // For this project, we'll assume the user has access if they know the URL

  const { count: restaurantCount } = await supabase
    .from('restaurants')
    .select('*', { count: 'exact', head: true })

  const { count: reviewCount } = await supabase
    .from('reviews')
    .select('*', { count: 'exact', head: true })

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
          <h2 className="text-stone-500 uppercase tracking-wider text-sm font-semibold mb-2">Total Restaurants</h2>
          <p className="text-4xl font-bold text-emerald-900">{restaurantCount || 0}</p>
          <Link href="/admin/restaurants" className="mt-4 inline-block text-amber-600 hover:text-amber-700 font-medium">
            Manage Restaurants →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
          <h2 className="text-stone-500 uppercase tracking-wider text-sm font-semibold mb-2">Total Reviews</h2>
          <p className="text-4xl font-bold text-emerald-900">{reviewCount || 0}</p>
          <button className="mt-4 inline-block text-amber-600 hover:text-amber-700 font-medium cursor-not-allowed">
            Moderate Reviews →
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
          <h2 className="text-stone-500 uppercase tracking-wider text-sm font-semibold mb-2">Quick Actions</h2>
          <Link href="/admin/restaurants/new" className="block mt-2 text-stone-700 hover:text-emerald-800">
            + Add New Restaurant
          </Link>
          <Link href="/guides" className="block mt-2 text-stone-700 hover:text-emerald-800">
            Edit Tourist Guides
          </Link>
        </div>
      </div>
    </div>
  )
}
