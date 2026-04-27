'use client'

import MovieCard from './MovieCard'
import { useMovies } from '@/hooks/useMovies'
import { Loader2 } from 'lucide-react'

export default function MovieGrid() {
  const { movies, loading } = useMovies()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 size={40} className="animate-spin text-carrot-start" />
      </div>
    )
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            Featured <span className="bg-gradient-to-r from-carrot-start to-carrot-end bg-clip-text text-transparent">Collection</span>
          </h2>
          <p className="text-gray-400 mt-2">Handpicked premium content</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster={movie.poster}
              rating={movie.rating}
              duration={movie.duration}
              genre={movie.genre}
            />
          ))}
        </div>

        {/* Empty State */}
        {movies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No movies yet. Start uploading!</p>
          </div>
        )}
      </div>
    </section>
  )
}
