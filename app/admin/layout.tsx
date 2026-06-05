import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-stone-50">
      <nav className="bg-stone-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/admin" className="text-xl font-bold font-serif text-amber-400">
            Taste Old Tappan Admin
          </Link>
          <div className="space-x-6">
            <Link href="/admin" className="hover:text-amber-400">Dashboard</Link>
            <Link href="/admin/restaurants" className="hover:text-amber-400">Restaurants</Link>
            <Link href="/" className="hover:text-amber-400">View Site</Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto py-8 px-4">
        {children}
      </main>
    </div>
  )
}
