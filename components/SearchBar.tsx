'use client'

import { Search, X } from 'lucide-react'
import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <div className="glass glass-hover rounded-full flex items-center px-6 py-3 gap-3">
        <Search size={18} className="text-carrot-start flex-shrink-0" />
        <input
          type="text"
          placeholder="Search by title or genre..."
          value={query}
          onChange={handleChange}
          className="bg-transparent w-full outline-none text-white placeholder-gray-500"
        />
        {query && (
          <button
            onClick={handleClear}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  )
}
