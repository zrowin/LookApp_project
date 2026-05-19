'use client';

import * as React from 'react';
import { Upload } from '@/components/features/upload';

export default function DashboardUploadPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="app-shell">
        <header className="app-page-header">
          <h2 className="text-2xl font-semibold">Dodaj ubranie</h2>
        </header>

        <div className="app-wide-panel">
          <Upload />
        </div>
      </div>
    </main>
  );
}
