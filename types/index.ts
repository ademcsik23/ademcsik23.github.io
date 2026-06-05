export interface Restaurant {
  id: string
  name: string
  description: string
  cuisine: string
  address: string
  phone: string
  website: string
  latitude: number
  longitude: number
  rating: number
  price_range: string
  hours: Record<string, string>
  featured_image: string
  created_at?: string
}

export interface Review {
  id: string
  restaurant_id: string
  user_id: string
  rating: number
  review_text: string
  created_at: string
  user?: {
    name: string
    avatar: string
  }
}

export interface Favorite {
  id: string
  user_id: string
  restaurant_id: string
}

export interface Photo {
  id: string
  restaurant_id: string
  user_id: string
  image_url: string
}

export interface Profile {
  id: string
  name: string
  email: string
  avatar: string
  role?: 'admin' | 'user'
}
