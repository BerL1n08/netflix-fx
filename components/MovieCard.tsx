'use client'

import { Star, Clock } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface MovieCardProps {
  id: string
  title: string
  poster: string
  rating: number
  duration: number
  genre: string
}

export default function MovieCard({ id, title, poster, rating, duration, genre }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/player/${id}`}>
      <div
        className="relative rounded-3xl overflow-hidden cursor-pointer card-hover h-72"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Poster Image */}
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

        {/* Metadata - Shown on hover */}
        {isHovered && (
          <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-midnight/90 via-midnight/40 to-transparent">
            <h3 className="text-xl font-bold text-white mb-2 slide-up">{title}</h3>

            <div className="flex items-center justify-between text-sm text-gray-300 gap-4">
              <div className="flex items-center gap-1">
                <Star size={16} className="text-carrot-start" />
                <span>{rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{duration} min</span>
              </div>
              <span className="text-carrot-start font-semibold">{genre}</span>
            </div>

            {/* Play Button */}
            <button className="btn-primary mt-4 w-full justify-center">
              Play Now
            </button>
          </div>
        )}
      </div>
    </Link>
  )
}
