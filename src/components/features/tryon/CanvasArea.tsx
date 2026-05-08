"use client"

import React from 'react'
import { CanvasItem, CanvasLayerDirection } from './TryOnPage'

const CANVAS_ITEM_MAX_SIZE = 220

export default function CanvasArea({
  items,
  onAdd,
  onUpdate,
  onRemove,
  onMoveLayer,
  rootRef,
}: {
  items: CanvasItem[]
  onAdd: (item: Omit<CanvasItem, 'id'>) => void
  onUpdate: (id: string, patch: Partial<CanvasItem>) => void
  onRemove: (id: string) => void
  onMoveLayer: (id: string, direction: CanvasLayerDirection) => void
  rootRef?: React.RefObject<HTMLDivElement | null>
}) {
  const internalRef = React.useRef<HTMLDivElement | null>(null)
  const ref = rootRef ?? internalRef
  const [selectedItemId, setSelectedItemId] = React.useState<string | null>(null)

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
  }

  async function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const raw = e.dataTransfer.getData('application/json')
    if (!raw) return
    try {
      const data = JSON.parse(raw)
      const rect = ref.current?.getBoundingClientRect()
      const x = (e.clientX - (rect?.left || 0))
      const y = (e.clientY - (rect?.top || 0))
      const { width, height } = await getImageDisplaySize(data.src)
      onAdd({ src: data.src, x, y, width, height })
    } catch (err) {}
  }

  return (
    <div
      ref={ref}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) setSelectedItemId(null)
      }}
      className="relative flex-1 h-[70vh] rounded-md border border-white/6 bg-black overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle, #252425 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }}
    >
      {items.map((it, index) => (
        <CanvasItemView
          key={it.id}
          item={it}
          zIndex={index + 1}
          isSelected={selectedItemId === it.id}
          hasMultipleItems={items.length > 1}
          onSelect={setSelectedItemId}
          onUpdate={onUpdate}
          onRemove={(id) => {
            onRemove(id)
            if (selectedItemId === id) setSelectedItemId(null)
          }}
          onMoveLayer={onMoveLayer}
          parentRef={ref}
        />
      ))}
      {items.length === 0 && <div className="absolute inset-0 flex items-center justify-center text-white/40">Przeciągnij ubrania tutaj</div>}
    </div>
  )
}

function getImageDisplaySize(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const image = new Image()
    image.onload = () => {
      const naturalWidth = image.naturalWidth || CANVAS_ITEM_MAX_SIZE
      const naturalHeight = image.naturalHeight || CANVAS_ITEM_MAX_SIZE
      const scale = Math.min(1, CANVAS_ITEM_MAX_SIZE / naturalWidth, CANVAS_ITEM_MAX_SIZE / naturalHeight)
      resolve({
        width: naturalWidth * scale,
        height: naturalHeight * scale,
      })
    }
    image.onerror = () => resolve({ width: 160, height: 220 })
    image.src = src
  })
}

function CanvasItemView({
  item,
  zIndex,
  isSelected,
  hasMultipleItems,
  onSelect,
  onUpdate,
  onRemove,
  onMoveLayer,
  parentRef,
}: {
  item: CanvasItem
  zIndex: number
  isSelected: boolean
  hasMultipleItems: boolean
  onSelect: (id: string) => void
  onUpdate: (id: string, patch: Partial<CanvasItem>) => void
  onRemove: (id: string) => void
  onMoveLayer: (id: string, direction: CanvasLayerDirection) => void
  parentRef: React.RefObject<HTMLDivElement | null>
}) {
  const elRef = React.useRef<HTMLDivElement | null>(null)
  const dragging = React.useRef(false)
  const offset = React.useRef({ x: 0, y: 0 })

  function onPointerDown(e: React.PointerEvent) {
    const rect = elRef.current?.getBoundingClientRect()
    if (!rect) return
    onSelect(item.id)
    dragging.current = true
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    elRef.current?.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current || !parentRef.current) return
    const parentRect = parentRef.current.getBoundingClientRect()
    const x = e.clientX - parentRect.left - offset.current.x
    const y = e.clientY - parentRect.top - offset.current.y
    onUpdate(item.id, { x, y })
  }

  function onPointerUp(e: React.PointerEvent) {
    dragging.current = false
    try {
      elRef.current?.releasePointerCapture(e.pointerId)
    } catch (e) {}
  }

  return (
    <div
      ref={elRef}
      style={{ left: item.x, top: item.y, width: item.width || 160, height: item.height || 220, zIndex }}
      className="absolute touch-none select-none cursor-grab"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div className={`relative h-full w-full rounded-md ${isSelected ? 'ring-2 ring-white/80 ring-offset-2 ring-offset-black' : ''}`}>
        <img src={item.src} alt="item" className="w-full h-full object-contain rounded-md shadow-lg" draggable={false} />

        {isSelected && hasMultipleItems && (
          <div className="absolute left-2 top-2 flex gap-1 rounded-md border border-white/10 bg-black/80 p-1 shadow-lg">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onMoveLayer(item.id, 'back')
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="rounded px-2 py-1 text-xs text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              Pod spód
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onMoveLayer(item.id, 'front')
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="rounded px-2 py-1 text-xs text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              Na wierzch
            </button>
          </div>
        )}

        <button
          onClick={() => onRemove(item.id)}
          onPointerDown={(e) => {
            e.stopPropagation()
          }}
          className="absolute -top-2 -right-2 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-xs shadow pointer-events-auto"
          aria-label="Usuń"
        >
          ×
        </button>
      </div>
    </div>
  )
}
