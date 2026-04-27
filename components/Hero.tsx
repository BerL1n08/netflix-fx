'use client'

import { Play } from 'lucide-react'
import { useState } from 'react'

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="relative w-full h-screen overflow-hidden pt-20">
      {/* Background with mesh gradient */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-60" />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-midnight via-transparent to-midnight opacity-40" />

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-8 px-6 text-center">
        {/* Featured Movie Badge */}
        <div className="glass glass-hover px-6 py-3 rounded-full">
          <span className="text-xs font-semibold text-carrot-start">🎯 FEATURED NOW</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl md:text-7xl font-bold max-w-4xl leading-tight slide-up">
          Experience Cinema
          <span className="bg-gradient-to-r from-carrot-start via-carrot-end to-carrot-start bg-clip-text text-transparent block mt-2">
            Redefined
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed fade-in">
          Premium streaming content. Curated for the discerning viewer. Built with Apple Design Language.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="btn-primary flex items-center justify-center gap-3 group"
          >
            <Play size={20} className="group-hover:scale-110 transition-transform" />
            <span>Watch Trailer</span>
          </button>

          <button className="glass glass-hover px-8 py-3 rounded-3xl font-semibold text-white flex items-center justify-center gap-3">
            <span>Browse Library</span>
          </button>
        </div>
      </div>

      {/* Floating elements for depth */}
      <div className="absolute top-1/4 left-10 w-48 h-48 bg-carrot-start opacity-10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-carrot-end opacity-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
    </section>
  )
}
