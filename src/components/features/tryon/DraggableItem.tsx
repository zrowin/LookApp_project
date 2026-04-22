"use client"

import React from 'react'

export default function DraggableItem({ item }: { item: { id: string; src: string } }) {
  function onDragStart(e: React.DragEvent) {
    e.dataTransfer.setData('application/json', JSON.stringify({ id: item.id, src: item.src }))
    try {
      const img = new Image()
      img.src = item.src
      e.dataTransfer.setDragImage(img, 40, 40)
    } catch (e) {}
  }

  return (
    <div className="w-full h-28 bg-white/5 rounded overflow-hidden">
      <img src={item.src} draggable onDragStart={onDragStart} className="w-full h-full object-cover" alt="ubranie" />
    </div>
  )
}
