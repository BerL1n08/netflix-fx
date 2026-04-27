import { NextResponse } from 'next/server'

// Mock data - Replace with database queries
const mockMovies = [
  {
    id: '1',
    title: 'Midnight Horizon',
    description: 'A gripping sci-fi thriller about time travel',
    genre: 'Sci-Fi',
    rating: 8.5,
    duration: 142,
    poster: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=500&h=750&fit=crop',
    video: '/videos/sample.mp4',
    uploadedAt: new Date(),
    uploadedBy: 'admin',
  },
  {
    id: '2',
    title: 'The Last Stand',
    description: 'An action-packed adventure through dystopian landscapes',
    genre: 'Action',
    rating: 7.8,
    duration: 128,
    poster: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=750&fit=crop',
    video: '/videos/sample2.mp4',
    uploadedAt: new Date(),
    uploadedBy: 'admin',
  },
]

export async function GET() {
  return NextResponse.json(mockMovies)
}
