'use client'

import { Search, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Restaurants', href: '/restaurants' },
  { name: 'Guides', href: '/guides' },
  { name: 'Map', href: '/map' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-cream-light border-b border-cream-dark sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-6">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-dark-green tracking-tight">
              TASTE<span className="text-gold">OLD TAPPAN</span>
            </Link>
            <div className="ml-10 hidden space-x-8 lg:block">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-dark-green hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4 flex items-center">
            <Link href="/restaurants" className="p-2 text-dark-green hover:text-gold">
              <Search className="h-6 w-6" />
            </Link>
            <Link
              href="/login"
              className="inline-block rounded-md border border-transparent bg-dark-green py-2 px-4 text-base font-medium text-white hover:bg-dark-green-light"
            >
              Sign in
            </Link>
            <button
              type="button"
              className="lg:hidden p-2 text-dark-green"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={cn("lg:hidden", mobileMenuOpen ? "block" : "hidden")}>
          <div className="space-y-1 pb-3 pt-2">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-dark-green hover:bg-cream hover:text-gold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
