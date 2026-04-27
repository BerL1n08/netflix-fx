import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form data
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const genre = formData.get('genre') as string
    const rating = parseFloat(formData.get('rating') as string)
    const duration = parseInt(formData.get('duration') as string)
    const videoFile = formData.get('video') as File
    const posterFile = formData.get('poster') as File

    // Validate files
    if (!videoFile || !posterFile) {
      return NextResponse.json(
        { error: 'Missing files' },
        { status: 400 }
      )
    }

    // TODO: Upload files to storage service (S3, Cloudinary, etc.)
    // TODO: Save metadata to database

    return NextResponse.json({
      success: true,
      message: 'Movie uploaded successfully',
      movie: {
        id: Math.random().toString(36).substr(2, 9),
        title,
        description,
        genre,
        rating,
        duration,
        uploadedAt: new Date(),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}
