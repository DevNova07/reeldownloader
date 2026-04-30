import { Camera } from "lucide-react"
import Link from "next/link"

export default function PhotoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-pink-600/10 mx-auto">
          <Camera className="h-10 w-10 text-pink-600" />
        </div>
        <h1 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-white mb-4 uppercase italic">Photo Downloader</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-md mx-auto font-bold opacity-80">
          Our specialized tool for downloading high-resolution photos and images is currently under development. Stay tuned for the launch!
        </p>
        <div className="mt-4">
          <Link href="/" className="inline-flex h-12 items-center justify-center rounded-xl bg-pink-600 px-8 text-sm font-bold text-white shadow-lg hover:bg-pink-700 transition-all uppercase tracking-widest">
            Go back Home
          </Link>
        </div>
      </div>
      </div>
    </div>
  )
}
