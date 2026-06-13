import Link from 'next/link'
import { Utensils, Coffee, Cake, Pizza, Wine, Beer } from 'lucide-react'

const CATEGORIES = [
  { name: 'Restaurants', icon: Utensils, color: 'bg-red-50 text-red-600', href: '/restaurants?type=restaurant' },
  { name: 'Cafés', icon: Coffee, color: 'bg-amber-50 text-amber-600', href: '/restaurants?type=cafe' },
  { name: 'Bakeries', icon: Cake, color: 'bg-pink-50 text-pink-600', href: '/restaurants?type=bakery' },
  { name: 'Pizza', icon: Pizza, color: 'bg-orange-50 text-orange-600', href: '/restaurants?type=pizza' },
  { name: 'Bars', icon: Beer, color: 'bg-yellow-50 text-yellow-600', href: '/restaurants?type=bar' },
  { name: 'Fine Dining', icon: Wine, color: 'bg-purple-50 text-purple-600', href: '/restaurants?type=fine-dining' },
]

export default function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-dark-green mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="flex flex-col items-center justify-center p-6 rounded-2xl border border-cream-dark hover:border-gold hover:shadow-sm transition-all group"
            >
              <div className={`p-4 rounded-full mb-4 ${category.color} group-hover:scale-110 transition-transform`}>
                <category.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-bold text-dark-green">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
