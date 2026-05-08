"use client"

import React from 'react'
import CanvasArea from './CanvasArea'
import WardrobeSidebar from './WardrobeSidebar'
import SavedIndicator from './SavedIndicator'
import { DataService } from '@/lib/dataService'
import type { Outfit } from '@/types/db'

export type CanvasItem = {
  id: string
  src: string
  x: number
  y: number
  width?: number
  height?: number
}

export type CanvasLayerDirection = 'front' | 'back'

export default function TryOnPage() {
  const [items, setItems] = React.useState<CanvasItem[]>([])
  const canvasRef = React.useRef<HTMLDivElement | null>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [previewDataUrl, setPreviewDataUrl] = React.useState<string | null>(null)
  const [outfitName, setOutfitName] = React.useState('')
  const [outfitDescription, setOutfitDescription] = React.useState('')
  const [saving, setSaving] = React.useState(false)

  function addItem(newItem: Omit<CanvasItem, 'id'>) {
    setItems((s) => [...s, { id: Date.now().toString(), ...newItem }])
  }

  function updateItem(id: string, patch: Partial<CanvasItem>) {
    setItems((s) => s.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  }

  function removeItem(id: string) {
    setItems((s) => s.filter((it) => it.id !== id))
  }

  function moveItemLayer(id: string, direction: CanvasLayerDirection) {
    setItems((current) => {
      const item = current.find((it) => it.id === id)
      if (!item) return current

      const others = current.filter((it) => it.id !== id)
      return direction === 'front' ? [...others, item] : [item, ...others]
    })
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-black text-white p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Przymierzalnia</h1>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-2 lg:flex-row">
        <div className="relative flex flex-1 items-stretch">
          <CanvasArea
            items={items}
            onAdd={addItem}
            onUpdate={updateItem}
            onRemove={removeItem}
            onMoveLayer={moveItemLayer}
            rootRef={canvasRef}
          />
          <SavedIndicator onOpen={async () => {
            if (!items || items.length === 0) {
              alert('Brak ubrań na canvasie. Dodaj ubrania aby zapisać stylizację.')
              return
            }

            // generate preview thumbnail
            const dataUrl = await generateThumbnail(items, canvasRef.current)
            setPreviewDataUrl(dataUrl)
            setOutfitName('')
            setOutfitDescription('')
            setIsModalOpen(true)
          }} />
        </div>

        {/* Modal for saving outfit */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-md rounded bg-neutral-900 p-4">
              <h3 className="text-lg font-medium mb-2">Zapisz stylizację</h3>
              <div className="mb-3">
                <div className="h-40 w-full bg-gray-800 rounded-md overflow-hidden flex items-center justify-center mb-2">
                  {previewDataUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={previewDataUrl} alt="Podgląd" className="h-full w-full object-cover" />
                  ) : (
                    <div className="text-white/40">Brak podglądu</div>
                  )}
                </div>

                <label className="text-sm block mb-1">Nazwa</label>
                <input value={outfitName} onChange={(e) => setOutfitName(e.target.value)} className="w-full rounded border px-3 py-2 bg-black text-white" />

                <label className="text-sm block mt-2 mb-1">Opis (opcjonalnie)</label>
                <textarea value={outfitDescription} onChange={(e) => setOutfitDescription(e.target.value)} className="w-full rounded border px-3 py-2 bg-black text-white" rows={3} />
              </div>

              <div className="flex justify-end gap-2">
                <button onClick={() => setIsModalOpen(false)} className="rounded px-3 py-2 bg-white text-black">Anuluj</button>
                <button
                  onClick={async () => {
                    if (!previewDataUrl) return
                    setSaving(true)
                    try {
                      const outfit: Outfit = {
                        id: Date.now().toString(),
                        name: outfitName || 'Nowy outfit',
                        description: outfitDescription || undefined,
                        clothingItemIds: items.map((i) => i.id),
                        coverImageId: undefined,
                        createdAt: new Date().toISOString(),
                        thumbnailDataUrl: previewDataUrl,
                      }
                      await DataService.saveOutfit(outfit as any)
                      setIsModalOpen(false)
                      alert('Stylizacja zapisana')
                    } catch (e) {
                      console.error(e)
                      alert('Błąd podczas zapisu')
                    } finally {
                      setSaving(false)
                    }
                  }}
                  className="rounded px-3 py-2 bg-white text-black"
                >
                  {saving ? 'Zapis...' : 'Zapisz'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="w-full shrink-0 lg:w-96 xl:w-md">
          <WardrobeSidebar />
        </div>
      </div>

    </main>
  )
}

async function drawItemsToCanvas(items: CanvasItem[], container: HTMLDivElement | null) {
  if (!container) return null
  const rect = container.getBoundingClientRect()
  const w = Math.max(200, Math.round(rect.width))
  const h = Math.max(200, Math.round(rect.height))

  const off = document.createElement('canvas')
  off.width = w
  off.height = h
  const ctx = off.getContext('2d')
  if (!ctx) return null
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, w, h)

  for (const it of items) {
    await new Promise<void>((res) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        try {
          ctx.drawImage(img, it.x, it.y, it.width || 160, it.height || 220)
        } catch (e) {}
        res()
      }
      img.onerror = () => res()
      img.src = it.src
    })
  }

  return off
}

async function generateThumbnail(items: CanvasItem[], container: HTMLDivElement | null) {
  const off = await drawItemsToCanvas(items, container)
  if (!off) return ''

  // generate thumbnail scaled to 480px width max
  const thumbW = 480
  const scale = Math.min(1, thumbW / off.width)
  const thumbCanvas = document.createElement('canvas')
  thumbCanvas.width = Math.round(off.width * scale)
  thumbCanvas.height = Math.round(off.height * scale)
  const tctx = thumbCanvas.getContext('2d')
  if (tctx) tctx.drawImage(off, 0, 0, thumbCanvas.width, thumbCanvas.height)
  return thumbCanvas.toDataURL('image/png')
}
