import { Metadata } from 'next'

// In a real app, you would fetch restaurant data here
async function getRestaurant(id: string) {
  // This is a placeholder for actual DB fetch
  return {
    name: "The Old Tappan Tavern",
    description: "A local staple serving classic American comfort food with a modern twist.",
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const restaurant = await getRestaurant(id)

  return {
    title: restaurant.name,
    description: restaurant.description,
  }
}

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
