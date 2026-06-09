import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const GUIDES = [
  {
    id: 'best-pizza',
    title: 'The Best Pizza in Old Tappan',
    description: 'From thin crust to deep dish, here are the top-rated pizzerias you must visit.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    count: 5,
  },
  {
    id: 'date-night',
    title: 'Perfect Date Night Restaurants',
    description: 'Impress your partner with these romantic and upscale dining spots.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800',
    count: 8,
  },
  {
    id: 'breakfast-spots',
    title: 'Best Breakfast & Brunch',
    description: 'Start your day right with the best pancakes, eggs, and coffee in town.',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=800',
    count: 6,
  },
  {
    id: 'hidden-gems',
    title: 'Hidden Gems of Old Tappan',
    description: 'Discover the underrated spots that locals keep to themselves.',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800',
    count: 4,
  },
  {
    id: 'family-friendly',
    title: 'Best Family Restaurants',
    description: 'Kid-approved menus and a welcoming atmosphere for the whole family.',
    image: 'https://images.unsplash.com/photo-1547573854-74d2a71d0826?auto=format&fit=crop&q=80&w=800',
    count: 7,
  },
  {
    id: 'italian-food',
    title: 'Top Italian Restaurants',
    description: 'Authentic pasta, risotto, and more from our favorite Italian kitchens.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800',
    count: 5,
  },
]

export default function GuidesPage() {
  return (
    <div className="bg-cream-light min-h-screen">
      {/* Hero Section */}
      <div className="bg-dark-green py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Curated Food Guides</h1>
          <p className="mt-4 text-xl text-cream-light/80 max-w-2xl mx-auto">
            Our expert-picked lists of the best places to eat and drink in Old Tappan.
          </p>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GUIDES.map((guide) => (
            <div key={guide.id} className="group bg-white rounded-2xl overflow-hidden border border-cream-dark shadow-sm hover:shadow-md transition-all">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-dark-green">
                  {guide.count} Places
                </div>
                <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors">
                  <Bookmark className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-green group-hover:text-gold transition-colors">
                  {guide.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {guide.description}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <Link href={`/guides/${guide.id}`}>
                    <Button variant="ghost" className="p-0 h-auto font-bold text-gold hover:text-dark-green">
                      Read Guide <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-white border-t border-cream-dark py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-dark-green">Want more recommendations?</h2>
          <p className="mt-2 text-gray-600">Subscribe to our newsletter to get new guides and restaurant news directly in your inbox.</p>
          <form className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow rounded-md border border-cream-dark px-4 py-2 focus:ring-2 focus:ring-gold outline-none"
            />
            <Button>Subscribe</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
