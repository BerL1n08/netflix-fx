'use client'

import { useRef, useState, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize2, SkipBack, SkipForward } from 'lucide-react'

interface CustomVideoPlayerProps {
  src: string
  title: string
}

export default function CustomVideoPlayer({ src, title }: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(100)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100
    }
  }

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  return (
    <div
      className="relative w-full bg-midnight rounded-3xl overflow-hidden group"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={() => videoRef.current && setCurrentTime(videoRef.current.currentTime)}
        onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
        onVolumeChange={() => videoRef.current && setVolume(videoRef.current.volume * 100)}
      />

      {/* Controls Overlay */}
      <div
        className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-midnight via-transparent to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Progress Bar */}
        <div className="w-full px-6 py-2">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => {
              if (videoRef.current) {
                videoRef.current.currentTime = Number(e.target.value)
              }
            }}
            className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-carrot-start"
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between px-6 py-4 gap-4">
          <div className="flex items-center gap-4">
            {/* Play/Pause */}
            <button
              onClick={togglePlayPause}
              className="text-white hover:text-carrot-start transition-colors"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            {/* Skip Buttons */}
            <button className="text-gray-400 hover:text-white transition-colors hidden sm:block">
              <SkipBack size={20} />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors hidden sm:block">
              <SkipForward size={20} />
            </button>

            {/* Time Display */}
            <span className="text-sm text-gray-300 hidden sm:inline">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Volume Control */}
            <div className="flex items-center gap-2 group/volume">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-0 group-hover/volume:w-24 transition-all duration-300 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-carrot-start"
              />
            </div>

            {/* Fullscreen */}
            <button
              onClick={handleFullscreen}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Maximize2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Play Button Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlayPause}
            className="btn-primary w-16 h-16 rounded-full flex items-center justify-center shadow-glow-lg hover:scale-110 transition-transform"
          >
            <Play size={32} className="ml-1" />
          </button>
        </div>
      )}
    </div>
  )
}
