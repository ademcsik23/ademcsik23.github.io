const { createClient } = require('@supabase/supabase-js')

// Note: You need to set these env vars or replace them manually if running locally
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role for seeding

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Service Role Key')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const restaurants = [
  {
    name: 'The Old Tappan Tavern',
    description: 'A local staple serving classic American comfort food with a modern twist. Great atmosphere and even better drinks. Our tavern features a warm, inviting interior with reclaimed wood accents and a cozy fireplace.',
    cuisine: 'American',
    address: '216 Old Tappan Rd, Old Tappan, NJ 07675',
    phone: '(201) 555-0123',
    website: 'https://oldtappantavern.com',
    latitude: 41.0187,
    longitude: -73.9982,
    rating: 4.8,
    price_range: '$$',
    hours: {
      'Monday': '11:00 AM - 10:00 PM',
      'Tuesday': '11:00 AM - 10:00 PM',
      'Wednesday': '11:00 AM - 10:00 PM',
      'Thursday': '11:00 AM - 11:00 PM',
      'Friday': '11:00 AM - 12:00 AM',
      'Saturday': '10:00 AM - 12:00 AM',
      'Sunday': '10:00 AM - 9:00 PM',
    },
    featured_image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'Patisserie Florentine',
    description: 'Authentic French pastries and artisan coffee in the heart of Old Tappan. The croissants are a must-try, made with imported French butter and baked fresh every morning.',
    cuisine: 'Bakery',
    address: '188 Central Ave, Old Tappan, NJ 07675',
    phone: '(201) 555-0124',
    website: 'https://patisserieflorentine.com',
    latitude: 41.0155,
    longitude: -74.0012,
    rating: 4.9,
    price_range: '$',
    hours: {
      'Monday': '7:00 AM - 6:00 PM',
      'Tuesday': '7:00 AM - 6:00 PM',
      'Wednesday': '7:00 AM - 6:00 PM',
      'Thursday': '7:00 AM - 6:00 PM',
      'Friday': '7:00 AM - 8:00 PM',
      'Saturday': '8:00 AM - 8:00 PM',
      'Sunday': '8:00 AM - 5:00 PM',
    },
    featured_image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'Il Forno',
    description: 'Upscale Italian dining featuring handmade pasta and wood-fired pizzas. Perfect for date night or family gatherings seeking authentic flavors of Italy.',
    cuisine: 'Italian',
    address: '45 Bi-State Plaza, Old Tappan, NJ 07675',
    phone: '(201) 555-0125',
    website: 'https://ilfornonj.com',
    latitude: 41.0123,
    longitude: -73.9955,
    rating: 4.7,
    price_range: '$$$',
    hours: {
      'Monday': 'Closed',
      'Tuesday': '4:00 PM - 10:00 PM',
      'Wednesday': '4:00 PM - 10:00 PM',
      'Thursday': '4:00 PM - 10:00 PM',
      'Friday': '4:00 PM - 11:00 PM',
      'Saturday': '12:00 PM - 11:00 PM',
      'Sunday': '12:00 PM - 9:00 PM',
    },
    featured_image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=1200'
  }
]

async function seed() {
  console.log('Seeding restaurants...')
  const { data, error } = await supabase
    .from('restaurants')
    .upsert(restaurants, { onConflict: 'name' })

  if (error) {
    console.error('Error seeding data:', error)
  } else {
    console.log('Successfully seeded restaurants!')
  }
}

seed()
