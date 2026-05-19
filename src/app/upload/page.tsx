'use client';

import { Upload } from '@/components/features/upload';

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="app-shell">
        <header className="app-page-header">
          <h1 className="text-2xl font-semibold">Dodaj ubranie</h1>
        </header>

        <div className="app-wide-panel">
          <Upload />
        </div>
      </div>
    </main>
  );
}
