import * as React from 'react'
import { Button } from '@/components/ui/button'
import { getShelves, addShelf as addShelfUtil, addItemToShelf } from '@/lib/shelves'

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
  const [selectedType, setSelectedType] = React.useState<string>('')
  const [color, setColor] = React.useState<string>('')
  const [styles, setStyles] = React.useState<string[]>([])
  const [availableStyles, setAvailableStyles] = React.useState<string[]>([
    'Casual',
    'Formal',
    'Sport',
    'Street',
    'Vintage',
  ])
  const [description, setDescription] = React.useState<string>('')
  const [shelves, setShelves] = React.useState<{ id: string; name: string }[]>([])

  const itemsRef = React.useRef<FileMeta[]>([])

  // keep ref in sync with items
  React.useEffect(() => {
    itemsRef.current = items
  }, [items])

  // revoke any remaining object URLs only when component unmounts
  React.useEffect(() => {
    return () => {
      itemsRef.current.forEach((it) => URL.revokeObjectURL(it.previewUrl))
    }
  }, [])

  React.useEffect(() => {
    setShelves(getShelves().map((s) => ({ id: s.id, name: s.name })))
  }, [])

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
    <div className="space-y-6 text-white">
      <div
        className="border-dashed border-2 border-white/10 p-6 md:p-8 rounded-lg text-center flex flex-col justify-center"
        onDrop={onDrop}
        onDragOver={onDragOver}
        style={{ backgroundColor: '#252425', minHeight: '40vh' }}
      >
        <div className="mb-4 flex items-center justify-center">
          <svg className="h-10 w-10 text-white/90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 12l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
        </div>
        <p className="mb-3 text-lg text-white">Przeciągnij pliki tutaj lub wybierz z dysku</p>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => inputRef.current?.click()} className="bg-white text-black">
            Wybierz pliki
          </Button>
          <div className="text-sm text-gray-300">Max 10 MB na plik. Tylko obrazy.</div>
        </div>
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
        <div className="space-y-4 bg-black/40 p-4 rounded-lg">
          <h4 className="font-semibold text-lg">Podgląd i kategoryzacja</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="grid grid-cols-3 gap-3">
                {items.map((it) => (
                  <div key={it.id} className="rounded overflow-hidden bg-[#3a3a3a] border border-white/5">
                    <img src={it.previewUrl} alt={it.file.name} className="w-full h-32 object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <form className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Typ ubrania (wymagane)</label>
                <select
                  value={selectedType}
                  onChange={(e) => {
                    const v = e.target.value
                    if (v === '__add__') {
                      const name = window.prompt('Nazwa półki')
                      if (name) {
                        const s = addShelfUtil(name)
                        setShelves((prev) => [...prev, { id: s.id, name: s.name }])
                        setSelectedType(s.id)
                      }
                    } else {
                      setSelectedType(v)
                    }
                  }}
                  className="w-full rounded border bg-black/40 px-3 py-2 text-white"
                >
                  <option value="">Wybierz półkę</option>
                  {shelves.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                  <option value="__add__">+ Dodaj nową półkę</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Kolor</label>
                <input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="np. czarny, biały, czerwony"
                  className="w-full rounded border bg-black/40 px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Styl (możesz wybrać kilka)</label>
                <div className="flex flex-wrap gap-2">
                  {availableStyles.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() =>
                        setStyles((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))
                      }
                      className={`px-3 py-1 rounded-full text-sm ${styles.includes(s) ? 'bg-white text-black' : 'bg-transparent border border-white/10 text-white'}`}
                    >
                      {s}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      const name = window.prompt('Podaj nazwę stylu')
                      if (!name) return
                      const trimmed = name.trim()
                      if (!trimmed) return
                      if (!availableStyles.includes(trimmed)) {
                        setAvailableStyles((prev) => [...prev, trimmed])
                      }
                      setStyles((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]))
                    }}
                    className="px-3 py-1 rounded-full text-sm bg-transparent border border-dashed border-white/20 text-white"
                  >
                    + Dodaj styl
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Opis</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded border bg-black/40 px-3 py-2 text-white" rows={3} />
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={() => {
                    if (!selectedType) return
                    // add all items to selected shelf with metadata
                    items.forEach((it) =>
                      addItemToShelf(selectedType, it.previewUrl, {
                        color: color || undefined,
                        styles: styles.length ? styles : undefined,
                        description: description || undefined,
                      })
                    )
                    // clear selected items
                    setItems([])
                    // refresh shelves in case other components read them
                    setShelves(getShelves().map((s) => ({ id: s.id, name: s.name })))
                    alert('Zapisano do wybranej półki')
                  }}
                  disabled={!selectedType}
                  className={`px-4 py-2 ${!selectedType ? 'opacity-50 pointer-events-none' : ''} bg-white text-black`}
                >
                  Zapisz
                </Button>
                <Button variant="ghost" onClick={() => setItems([])}>
                  Anuluj
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

Upload.displayName = 'Upload'
