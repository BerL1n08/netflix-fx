# 🎬 NetflixFX - Apple Aesthetic Movie Streaming Platform

A luxury, high-end movie streaming platform built with Next.js, Tailwind CSS, and Apple Design Language principles.

## 🎨 Design Features

- **Theme**: Professional Dark Mode with Midnight Blue (`#0a0f1e`)
- **Accent**: Vibrant Carrot Orange gradient (`#ff7e5f` to `#feb47b`)
- **Style**: Glassmorphism with heavy backdrop blur effects
- **Design System**: Strict Apple Design Language with 24px+ border radius
- **Animations**: Smooth micro-interactions and cinematic transitions

## 🛠 Technical Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS 3.3
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Video Player**: Custom HTML5 implementation
- **Responsiveness**: Mobile-first approach

## 📦 Features

✅ **Hero Section** - Cinematic landing page with animated mesh gradient
✅ **Movie Grid** - Responsive grid with hover animations and metadata
✅ **Search & Filter** - Glassmorphic search bar with instant filtering
✅ **Custom Video Player** - Fully featured player with controls and fullscreen
✅ **Admin Upload** - Complete file upload system for movies and posters
✅ **Mobile Responsive** - Optimized for all screen sizes
✅ **Performance** - Optimized images and lazy loading

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

## 📁 Project Structure

```
netflix-fx/
├── app/
│   ├── api/
│   │   ├── movies/
│   │   └── upload/
│   ├── upload/
│   ├── player/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── MovieGrid.tsx
│   ├── MovieCard.tsx
│   ├── SearchBar.tsx
│   ├── CustomVideoPlayer.tsx
│   └── UploadForm.tsx
├── hooks/
│   └── useMovies.ts
├── types/
│   └── index.ts
└── public/
```

## 🎯 Key Pages

- `/` - Home page with hero and movie grid
- `/upload` - Content management and upload interface
- `/player/[id]` - Individual movie player page

## 🔐 Environment Variables

Create a `.env.local` file:

```env
# Database
DATABASE_URL=your_database_url

# Storage (S3, Cloudinary, etc.)
STORAGE_API_KEY=your_storage_key
STORAGE_API_SECRET=your_storage_secret
```

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Midnight | `#0a0f1e` | Primary background |
| Midnight Light | `#151d2d` | Secondary background |
| Carrot Start | `#ff7e5f` | Primary accent |
| Carrot End | `#feb47b` | Gradient end |

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 769px - 1024px
- **Desktop**: 1025px+

## 🔄 Next Steps

1. Connect to a database (MongoDB, PostgreSQL, etc.)
2. Implement file storage (AWS S3, Cloudinary, Vercel Blob)
3. Add authentication system
4. Implement analytics
5. Add streaming quality options
6. Deploy to production

## 📝 License

MIT License - Feel free to use this for personal and commercial projects.

---

**Built with ❤️ for cinematic streaming experiences** 🎬✨
