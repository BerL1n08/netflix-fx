'use client'

import { useState } from 'react'
import { Upload as UploadIcon, X } from 'lucide-react'

export default function UploadForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    rating: 7.5,
    duration: 120,
  })
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [posterFile, setPosterFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) : name === 'duration' ? parseInt(value) : value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'video' | 'poster') => {
    const file = e.target.files?.[0]
    if (file) {
      if (type === 'video') {
        setVideoFile(file)
      } else {
        setPosterFile(file)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    if (!videoFile || !posterFile) {
      setError('Please select both video and poster files')
      setIsLoading(false)
      return
    }

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('genre', formData.genre)
      formDataToSend.append('rating', formData.rating.toString())
      formDataToSend.append('duration', formData.duration.toString())
      formDataToSend.append('video', videoFile)
      formDataToSend.append('poster', posterFile)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataToSend,
      })

      if (!response.ok) throw new Error('Upload failed')

      setSuccess('Movie uploaded successfully!')
      setFormData({ title: '', description: '', genre: '', rating: 7.5, duration: 120 })
      setVideoFile(null)
      setPosterFile(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="glass glass-hover p-8 rounded-3xl space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Movie Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter movie title"
            className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-carrot-start transition-all"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter movie description"
            rows={4}
            className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-carrot-start transition-all resize-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Genre */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Genre
            </label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-carrot-start transition-all"
              required
            >
              <option value="">Select genre</option>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
              <option value="Thriller">Thriller</option>
              <option value="Sci-Fi">Sci-Fi</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-carrot-start transition-all"
              required
            />
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Rating (0-10)
          </label>
          <input
            type="number"
            name="rating"
            min="0"
            max="10"
            step="0.1"
            value={formData.rating}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-carrot-start transition-all"
            required
          />
        </div>

        {/* Video File Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Video File
          </label>
          <div className="relative border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-carrot-start transition-colors">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileChange(e, 'video')}
              className="absolute inset-0 opacity-0 cursor-pointer"
              required
            />
            <div className="flex flex-col items-center gap-2">
              <UploadIcon size={32} className="text-carrot-start" />
              <p className="text-white font-semibold">
                {videoFile ? videoFile.name : 'Click to upload video'}
              </p>
              <p className="text-gray-500 text-sm">MP4, WebM or OGG (Max 2GB)</p>
            </div>
          </div>
        </div>

        {/* Poster File Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Poster Image
          </label>
          <div className="relative border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-carrot-start transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'poster')}
              className="absolute inset-0 opacity-0 cursor-pointer"
              required
            />
            <div className="flex flex-col items-center gap-2">
              <UploadIcon size={32} className="text-carrot-start" />
              <p className="text-white font-semibold">
                {posterFile ? posterFile.name : 'Click to upload poster'}
              </p>
              <p className="text-gray-500 text-sm">PNG, JPG or WebP (Max 5MB)</p>
            </div>
          </div>
        </div>

        {/* Error & Success Messages */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-red-400 text-sm flex items-center gap-3">
            <X size={16} />
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 text-green-400 text-sm">
            {success}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Uploading...' : 'Upload Movie'}
        </button>
      </div>
    </form>
  )
}
