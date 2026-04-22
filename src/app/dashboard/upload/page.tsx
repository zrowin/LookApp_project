"use client"

import * as React from 'react'
import { Upload } from '@/components/features/upload'

export default function DashboardUploadPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Dodaj ubranie</h2>
      </header>

      <div className="w-full max-w-4xl mx-auto">
        <Upload />
      </div>
    </main>
  )
}
