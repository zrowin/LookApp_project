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
      image.style.objectFit = 'cover'
      preview.appendChild(image)
      document.body.appendChild(preview)

      e.dataTransfer.setDragImage(preview, offsetX, offsetY)
      window.setTimeout(() => preview.remove(), 0)
    } catch (e) {}
  }

  return (
    <div className="w-full h-28 bg-white/5 rounded overflow-hidden">
      <img src={item.src} draggable onDragStart={onDragStart} className="w-full h-full cursor-grab object-cover" alt="ubranie" />
    </div>
  )
}
