import { Star } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Review as ReviewType } from '@/types'

interface RestaurantReviewsProps {
  restaurantId: string
  initialReviews: ReviewType[]
}

export default function RestaurantReviews({ restaurantId, initialReviews }: RestaurantReviewsProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-dark-green">User Reviews</h2>
        <Button variant="outline">Write a Review</Button>
      </div>

      <div className="space-y-8">
        {initialReviews.length > 0 ? (
          initialReviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-2xl border border-cream-dark shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3 text-xs bg-stone-100 flex items-center justify-center">
                    {review.user?.avatar ? (
                      <Image src={review.user.avatar} alt={review.user.name} fill className="object-cover" />
                    ) : (
                      <span>{review.user?.name?.[0]}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-dark-green text-sm">{review.user?.name || 'Anonymous'}</h4>
                    <p className="text-xs text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
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
                {review.review_text}
              </p>
            </div>
          ))
        ) : (
          <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-stone-300">
            <p className="text-stone-500 italic">No reviews yet. Be the first to share your experience!</p>
          </div>
        )}
      </div>

      {initialReviews.length > 0 && (
        <Button variant="ghost" className="mt-8 w-full text-gold font-bold">View More Reviews</Button>
      )}
    </section>
  )
}
