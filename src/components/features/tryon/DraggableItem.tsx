"use client"

import React from 'react'

const MAX_DRAG_PREVIEW_SIZE = 96

export default function DraggableItem({ item }: { item: { id: string; src: string } }) {
  function onDragStart(e: React.DragEvent) {
    e.dataTransfer.setData('application/json', JSON.stringify({ id: item.id, src: item.src }))

    try {
      const source = e.currentTarget as HTMLImageElement
      const rect = source.getBoundingClientRect()
      const scale = Math.min(1, MAX_DRAG_PREVIEW_SIZE / rect.width, MAX_DRAG_PREVIEW_SIZE / rect.height)
      const previewWidth = rect.width * scale
      const previewHeight = rect.height * scale
      const offsetX = (e.clientX - rect.left) * scale
      const offsetY = (e.clientY - rect.top) * scale

      const preview = document.createElement('div')
      preview.style.position = 'fixed'
      preview.style.top = '-10000px'
      preview.style.left = '-10000px'
      preview.style.width = `${previewWidth}px`
      preview.style.height = `${previewHeight}px`
      preview.style.overflow = 'hidden'
      preview.style.borderRadius = '6px'
      preview.style.background = '#252425'
      preview.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.35)'
      preview.style.pointerEvents = 'none'

      const image = source.cloneNode(true) as HTMLImageElement
      image.style.width = '100%'
      image.style.height = '100%'
      image.style.objectFit = 'contain'
      preview.appendChild(image)
      document.body.appendChild(preview)

      e.dataTransfer.setDragImage(preview, offsetX, offsetY)
      window.setTimeout(() => preview.remove(), 0)
    } catch (e) {}
  }

  return (
    <div className="tryon-draggable-item w-full overflow-hidden rounded-2xl bg-white/5">
      {item.src ? (
        <img src={item.src} draggable onDragStart={onDragStart} className="masonry-photo cursor-grab" alt="ubranie" />
      ) : (
        <div className="h-24 w-full flex items-center justify-center text-white/40">Ładowanie...</div>
      )}
    </div>
  )
}
