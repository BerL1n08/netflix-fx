import UploadForm from '@/components/UploadForm'

export default function UploadPage() {
  return (
    <div className="min-h-screen pt-32 px-6 pb-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Upload Your <span className="bg-gradient-to-r from-carrot-start to-carrot-end bg-clip-text text-transparent">Masterpiece</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Share your content with the world. Premium hosting. Zero compromises.
          </p>
        </div>

        {/* Form */}
        <UploadForm />
      </div>
    </div>
  )
}
