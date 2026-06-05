import { createClient } from '@/lib/supabase/server'
import RestaurantDetailClient from '@/components/restaurant/RestaurantDetailClient'
import { notFound } from 'next/navigation'

export default async function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', id)
    .single()

  if (!restaurant) {
    notFound()
  }

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*, profiles(name, avatar)')
    .eq('restaurant_id', id)
    .order('created_at', { ascending: false })

  // Map profiles to user for the UI
  const formattedReviews = reviews?.map((review: any) => ({
    ...review,
    user: review.profiles
  })) || []

  return <RestaurantDetailClient restaurant={restaurant} reviews={formattedReviews} />
}
