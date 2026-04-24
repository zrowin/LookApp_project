"use client"

import React from 'react'
import { CanvasItem } from './TryOnPage'

export default function CanvasArea({
  items,
  onAdd,
  onUpdate,
  onRemove,
}: {
  items: CanvasItem[]
  onAdd: (item: Omit<CanvasItem, 'id'>) => void
  onUpdate: (id: string, patch: Partial<CanvasItem>) => void
  onRemove: (id: string) => void
}) {
  const ref = React.useRef<HTMLDivElement | null>(null)

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const raw = e.dataTransfer.getData('application/json')
    if (!raw) return
    try {
      const data = JSON.parse(raw)
      const rect = ref.current?.getBoundingClientRect()
      const x = (e.clientX - (rect?.left || 0))
      const y = (e.clientY - (rect?.top || 0))
      onAdd({ src: data.src, x, y, width: 160, height: 220 })
    } catch (err) {}
  }

  return (
    <div
      ref={ref}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative flex-1 h-[70vh] rounded-md border border-white/6 bg-black overflow-hidden"
    >
      {items.map((it) => (
        <CanvasItemView key={it.id} item={it} onUpdate={onUpdate} onRemove={onRemove} parentRef={ref} />
      ))}
      {items.length === 0 && <div className="absolute inset-0 flex items-center justify-center text-white/40">Przeciągnij ubrania tutaj</div>}
    </div>
  )
}

function CanvasItemView({
  item,
  onUpdate,
  onRemove,
  parentRef,
}: {
  item: CanvasItem
  onUpdate: (id: string, patch: Partial<CanvasItem>) => void
  onRemove: (id: string) => void
  parentRef: React.RefObject<HTMLDivElement | null>
}) {
  const elRef = React.useRef<HTMLDivElement | null>(null)
  const dragging = React.useRef(false)
  const offset = React.useRef({ x: 0, y: 0 })

  function onPointerDown(e: React.PointerEvent) {
    const rect = elRef.current?.getBoundingClientRect()
    if (!rect) return
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
      style={{ left: item.x, top: item.y, width: item.width || 160, height: item.height || 220 }}
      className="absolute touch-none select-none cursor-grab"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div className="relative w-full h-full">
        <img src={item.src} alt="item" className="w-full h-full object-cover rounded-md shadow-lg" draggable={false} />

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
