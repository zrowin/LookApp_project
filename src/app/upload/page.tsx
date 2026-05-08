"use client"

import { Upload } from '@/components/features/upload'

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-black p-6 text-white">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dodaj ubranie</h1>
      </header>

      <div className="mx-auto w-full max-w-4xl">
        <Upload />
      </div>
    </main>
  )
}
