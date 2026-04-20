import * as React from 'react'
import { Button } from '@/components/ui/button'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

type FileMeta = {
  id: string
  file: File
  previewUrl: string
  error?: string
}

export function Upload() {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [items, setItems] = React.useState<FileMeta[]>([])

  React.useEffect(() => {
    return () => {
      items.forEach((it) => URL.revokeObjectURL(it.previewUrl))
    }
  }, [items])

  function validateFile(file: File): string | undefined {
    if (!file.type.startsWith('image/')) return 'Nieobsługiwany typ pliku'
    if (file.size > MAX_FILE_SIZE) return 'Plik przekracza maks. rozmiar 10 MB'
    return undefined
  }

  function addFiles(list: FileList | null) {
    if (!list) return
    const newItems: FileMeta[] = Array.from(list).map((file) => {
      const previewUrl = URL.createObjectURL(file)
      return {
        id: `${file.name}-${file.size}-${Date.now()}`,
        file,
        previewUrl,
        error: validateFile(file),
      }
    })
    setItems((prev) => [...prev, ...newItems])
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    addFiles(e.target.files)
    e.currentTarget.value = ''
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    addFiles(e.dataTransfer.files)
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
  }

  function removeItem(id: string) {
    setItems((prev) => {
      const toRemove = prev.find((p) => p.id === id)
      if (toRemove) URL.revokeObjectURL(toRemove.previewUrl)
      return prev.filter((p) => p.id !== id)
    })
  }

  return (
    <div className="space-y-4">
      <div
        className="border-dashed border-2 border-gray-300 p-6 rounded-md text-center"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <p className="mb-2">Przeciągnij pliki tutaj lub wybierz z dysku</p>
        <Button onClick={() => inputRef.current?.click()}>Wybierz pliki</Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onInputChange}
          className="hidden"
        />
      </div>

      {items.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Wybrane pliki</h4>
          <ul className="grid grid-cols-2 gap-3">
            {items.map((it) => (
              <li key={it.id} className="flex items-center space-x-3">
                <img src={it.previewUrl} alt={it.file.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1 text-sm">
                  <div className="font-medium">{it.file.name}</div>
                  <div className="text-gray-500">{(it.file.size / 1024).toFixed(0)} KB</div>
                  {it.error && <div className="text-red-600 text-xs">{it.error}</div>}
                </div>
                <div>
                  <Button variant="destructive" size="sm" onClick={() => removeItem(it.id)}>
                    Usuń
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

Upload.displayName = 'Upload'
