import { Star } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

interface Review {
  id: string
  user: {
    name: string
    avatar?: string
  }
  rating: number
  text: string
  date: string
}

const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    user: { name: 'Sarah J.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
    rating: 5,
    text: 'Absolutely delicious! The Tavern Burger is by far the best in town. Great service and atmosphere.',
    date: '2 weeks ago'
  },
  {
    id: '2',
    user: { name: 'Michael R.', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100' },
    rating: 4,
    text: 'Great food, but it can get pretty loud on weekend nights. The Brussels sprouts are life-changing though!',
    date: '1 month ago'
  }
]

export default function RestaurantReviews() {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-dark-green">User Reviews</h2>
        <Button variant="outline">Write a Review</Button>
      </div>

      <div className="space-y-8">
        {MOCK_REVIEWS.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-2xl border border-cream-dark shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                  <Image src={review.user.avatar || '/placeholder-avatar.jpg'} alt={review.user.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-dark-green text-sm">{review.user.name}</h4>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? 'fill-gold text-gold' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {review.text}
            </p>
          </div>
        ))}
      </div>

      <Button variant="ghost" className="mt-8 w-full text-gold font-bold">View More Reviews</Button>
    </section>
  )
}
