import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark-green text-cream-light">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              TASTE<span className="text-gold">OLD TAPPAN</span>
            </Link>
            <p className="mt-4 text-sm text-cream/80 max-w-xs">
              Discover the best culinary experiences in Old Tappan, New Jersey. From cozy cafés to fine dining.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">Explore</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/restaurants" className="text-sm hover:text-white">All Restaurants</Link></li>
              <li><Link href="/guides" className="text-sm hover:text-white">Food Guides</Link></li>
              <li><Link href="/map" className="text-sm hover:text-white">Interactive Map</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-sm hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-white">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-dark-green-light pt-8 text-center">
          <p className="text-sm text-cream/60">
            &copy; {new Date().getFullYear()} Taste Old Tappan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
