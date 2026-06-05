import { Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function Hero() {
  return (
    <div className="relative bg-dark-green py-24 sm:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gold blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-gold blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Discover the Best Food in <span className="text-gold">Old Tappan</span>
        </h1>
        <p className="mt-6 mx-auto max-w-2xl text-xl text-cream-light/80">
          From hidden gems to local favorites, explore the culinary heart of New Jersey&apos;s finest neighborhood.
        </p>

        <div className="mt-10 mx-auto max-w-2xl">
          <form className="relative flex items-center">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search by restaurant, cuisine, or dish..."
                className="pl-10 h-14 text-lg rounded-l-md rounded-r-none border-none shadow-lg focus-visible:ring-0"
              />
            </div>
            <Button size="lg" className="h-14 rounded-l-none rounded-r-md px-8 font-bold shadow-lg">
              Search
            </Button>
          </form>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="text-sm text-cream-light/60">Trending:</span>
            {['Italian', 'Pizza', 'Coffee', 'Sushi', 'Bakery'].map((tag) => (
              <button key={tag} className="text-sm font-medium text-gold hover:text-white transition-colors">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
