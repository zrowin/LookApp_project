"use client"

import * as React from 'react'
import { Upload } from '@/components/features/upload'

export default function DashboardUploadPage() {
  return (
    <div className="mx-auto max-w-4xl p-8">
      <h2 className="mb-6 text-2xl font-semibold">Panel uploadu zdjęć</h2>
      <Upload />
    </div>
  )
}
