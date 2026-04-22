"use client"

import * as React from 'react'
import { Upload } from '@/components/features/upload'

export default function DashboardUploadPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-start justify-center p-8">
      <div className="w-full max-w-4xl">
        <h2 className="mb-6 text-3xl font-semibold">Dodaj ubranie</h2>
        <Upload />
      </div>
    </div>
  )
}
