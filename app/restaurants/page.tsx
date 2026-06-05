import { createClient } from '@/lib/supabase/server'
import RestaurantsClient from '@/components/restaurant/RestaurantsClient'

export default async function RestaurantsPage() {
  const supabase = await createClient()

  const { data: restaurants } = await supabase
    .from('restaurants')
    .select('*')
    .order('rating', { ascending: false })

  return <RestaurantsClient initialRestaurants={restaurants || []} />
}
