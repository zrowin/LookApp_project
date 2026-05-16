"use client"

import React from 'react'
import { CanvasItem, CanvasLayerDirection } from './TryOnPage'

const CANVAS_ITEM_MAX_SIZE = 220
const CANVAS_ITEM_MIN_SIZE = 40
const CANVAS_ITEM_SCALE_MAX_SIZE = 520

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
      className="relative flex-1 h-[70vh] rounded-md border border-white/6 overflow-hidden"
      style={{
        backgroundColor: '#252425',
        backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)',
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
      {items.length === 0 && <div className="absolute inset-0 flex items-center justify-center text-white/25">Przeciągnij ubrania tutaj</div>}
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
  const resizing = React.useRef(false)
  const offset = React.useRef({ x: 0, y: 0 })
  const resizeStart = React.useRef({ x: 0, y: 0, width: 0, height: 0 })
  const [isLayerMenuOpen, setIsLayerMenuOpen] = React.useState(false)
  const [isResizing, setIsResizing] = React.useState(false)

  function onPointerDown(e: React.PointerEvent) {
    const rect = elRef.current?.getBoundingClientRect()
    if (!rect) return
    onSelect(item.id)
    dragging.current = true
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    elRef.current?.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current || resizing.current || !parentRef.current) return
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

  function onResizePointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    e.stopPropagation()
    onSelect(item.id)
    resizing.current = true
    setIsResizing(true)
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      width: item.width || 160,
      height: item.height || 220,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onResizePointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    if (!resizing.current) return

    const { x, y, width, height } = resizeStart.current
    const largestSide = Math.max(width, height)
    const dxScale = (width + e.clientX - x) / width
    const dyScale = (height + e.clientY - y) / height
    const requestedScale = Math.max(dxScale, dyScale)
    const appliedScale = Math.min(
      CANVAS_ITEM_SCALE_MAX_SIZE / largestSide,
      Math.max(CANVAS_ITEM_MIN_SIZE / largestSide, requestedScale),
    )

    onUpdate(item.id, {
      width: width * appliedScale,
      height: height * appliedScale,
    })
  }

  function onResizePointerUp(e: React.PointerEvent<HTMLButtonElement>) {
    resizing.current = false
    setIsResizing(false)
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
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
      <div
        className={`group relative h-full w-full rounded-md ${isSelected ? 'ring-2 ring-white/80 ring-offset-2 ring-offset-black' : ''}`}
        onPointerLeave={() => setIsLayerMenuOpen(false)}
      >
        <img src={item.src} alt="item" className="w-full h-full object-contain rounded-md shadow-lg" draggable={false} />

        {hasMultipleItems && (
          <div
            className={`absolute left-2 top-2 transition-opacity ${
              isLayerMenuOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsLayerMenuOpen((open) => !open)
                }}
                onPointerDown={(e) => e.stopPropagation()}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-black/80 text-white/80 shadow-lg transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Warstwy"
                title="Warstwy"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M5 8h14M7 12h10M9 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>

              {isLayerMenuOpen && (
                <div className="absolute left-0 top-10 z-10 flex min-w-28 flex-col rounded-md border border-white/10 bg-black/90 p-1 shadow-lg">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onMoveLayer(item.id, 'front')
                      setIsLayerMenuOpen(false)
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="rounded px-2 py-1 text-left text-xs text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    Na wierzch
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onMoveLayer(item.id, 'back')
                      setIsLayerMenuOpen(false)
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="rounded px-2 py-1 text-left text-xs text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    Pod spód
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <button
          onClick={() => onRemove(item.id)}
          onPointerDown={(e) => {
            e.stopPropagation()
          }}
          className="pointer-events-auto absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs text-black opacity-0 shadow transition-opacity group-hover:opacity-100"
          aria-label="Usuń"
        >
          ×
        </button>

        <button
          type="button"
          onPointerDown={onResizePointerDown}
          onPointerMove={onResizePointerMove}
          onPointerUp={onResizePointerUp}
          onPointerCancel={onResizePointerUp}
          className={`absolute -bottom-3 -right-3 flex h-8 w-8 cursor-nwse-resize items-center justify-center rounded-full border border-white/10 bg-black/80 text-white shadow-lg transition-opacity hover:bg-white/10 ${
            isResizing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
          aria-label="Zmień rozmiar"
          title="Zmień rozmiar"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g transform="scale(-1 1) translate(-24 0)">
              <path d="M8 16 16 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M11 8h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 16H8v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </button>
      </div>
    </div>
  )
}
