import Hero from '@/components/home/Hero'
import FeaturedRestaurants from '@/components/home/FeaturedRestaurants'
import Categories from '@/components/home/Categories'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { MapPin, Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()

  const { data: featuredRestaurants } = await supabase
    .from('restaurants')
    .select('*')
    .limit(3)
    .order('rating', { ascending: false })

  return (
    <div className="flex flex-col">
      <Hero />
      <Categories />
      <FeaturedRestaurants restaurants={featuredRestaurants || []} />

      {/* Interactive Map Preview */}
      <section className="py-16 bg-white border-y border-cream-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-dark-green sm:text-4xl">Explore the Map</h2>
              <p className="mt-4 text-lg text-gray-600">
                Visualize all of Old Tappan&apos;s dining options in one place. Find restaurants near you and discover new favorites.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-gold">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <p className="ml-3 text-base text-gray-600">
                    Filter by cuisine, rating, and distance.
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <Link href="/map">
                  <Button size="lg">Open Interactive Map</Button>
                </Link>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl border-4 border-cream">
              {/* Mock map image */}
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-400 font-medium">Interactive Map Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-dark-green rounded-3xl py-12 px-6 sm:px-12 shadow-2xl relative overflow-hidden">
             {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
              <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-gold blur-2xl"></div>
            </div>

            <Mail className="mx-auto h-12 w-12 text-gold mb-6" />
            <h2 className="text-3xl font-bold text-white">Join the Foodie Club</h2>
            <p className="mt-4 text-cream-light/80 max-w-md mx-auto">
              Get the latest restaurant openings, exclusive deals, and curated food guides delivered to your inbox.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow rounded-md border-none px-4 py-3 text-dark-green focus:ring-2 focus:ring-gold"
                required
              />
              <Button variant="gold" className="font-bold">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
