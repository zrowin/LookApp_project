import * as React from 'react'
import { Button } from '@/components/ui/button'
import { getShelves, addShelf as addShelfUtil, addItemToShelf } from '@/lib/shelves'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

const COLOR_OPTIONS = [
  { label: 'Czarny', value: 'czarny', swatch: '#000000' },
  { label: 'Biały', value: 'biały', swatch: '#ffffff' },
  { label: 'Szary', value: 'szary', swatch: '#8a8a8a' },
  { label: 'Beżowy', value: 'beżowy', swatch: '#d8c3a5' },
  { label: 'Żółty', value: 'żółty', swatch: '#facc15' },
  { label: 'Pomarańczowy', value: 'pomarańczowy', swatch: '#f97316' },
  { label: 'Czerwony', value: 'czerwony', swatch: '#ef4444' },
  { label: 'Różowy', value: 'różowy', swatch: '#ec4899' },
  { label: 'Fioletowy', value: 'fioletowy', swatch: '#8b5cf6' },
  { label: 'Niebieski', value: 'niebieski', swatch: '#3b82f6' },
  { label: 'Zielony', value: 'zielony', swatch: '#22c55e' },
  { label: 'Wielobarwny', value: 'wielobarwny', swatch: 'conic-gradient(#ef4444, #facc15, #22c55e, #3b82f6, #8b5cf6, #ef4444)' },
]

type FileMeta = {
  id: string
  file: File
  previewUrl: string
  error?: string
}

export function Upload() {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [items, setItems] = React.useState<FileMeta[]>([])
  const [activeItemId, setActiveItemId] = React.useState<string | null>(null)
  const [selectedType, setSelectedType] = React.useState<string>('')
  const [color, setColor] = React.useState<string>('')
  const [isColorDropdownOpen, setIsColorDropdownOpen] = React.useState(false)
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
  const activeItem = items.find((item) => item.id === activeItemId) ?? items[0]
  const queuedItems = items.filter((item) => item.id !== activeItem?.id)
  const selectedColor = COLOR_OPTIONS.find((option) => option.value === color)

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

  React.useEffect(() => {
    if (items.length === 0) {
      setActiveItemId(null)
      return
    }

    if (!activeItemId || !items.some((item) => item.id === activeItemId)) {
      setActiveItemId(items[0].id)
    }
  }, [activeItemId, items])

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

  function clearCurrentMetadata() {
    setColor('')
    setStyles([])
    setDescription('')
    setIsColorDropdownOpen(false)
  }

  function saveActiveItem() {
    if (!selectedType || !activeItem || activeItem.error) return

    async function uploadAndStore() {
      let remoteUrl = ''

      // try uploading to server to get a persistent storage path
      try {
        const toBase64 = (file: File) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve((reader.result as string).split(',')[1])
            reader.onerror = reject
            reader.readAsDataURL(file)
          })

        const fileBase64 = await toBase64(activeItem.file)
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: activeItem.file.name, fileBase64, removeBg: false }),
        })
        const json = await res.json()
        if (json?.thumbnailPath) {
          remoteUrl = `storage://${json.thumbnailPath}`
        } else if (json?.thumbnailUrl) {
          remoteUrl = json.thumbnailUrl
        } else if (json?.url) {
          remoteUrl = json.url
        }
      } catch (e) {
        console.warn('Upload failed, falling back to data URI', e)
      }

      // fallback: if upload didn't produce a remote URL, store data URI for persistence
      if (!remoteUrl) {
        try {
          const reader = new FileReader()
          const dataUrl = await new Promise<string>((resolve, reject) => {
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(activeItem.file)
          })
          remoteUrl = dataUrl
        } catch (e) {
          // last resort, keep previewUrl (may be ephemeral)
          remoteUrl = activeItem.previewUrl
        }
      }

      addItemToShelf(selectedType, remoteUrl, {
        color: color || undefined,
        styles: styles.length ? styles : undefined,
        description: description || undefined,
      })

      setItems((prev) => {
        const activeIndex = prev.findIndex((item) => item.id === activeItem.id)
        const nextItems = prev.filter((item) => item.id !== activeItem.id)
        const nextActive = nextItems[activeIndex] ?? nextItems[activeIndex - 1] ?? nextItems[0] ?? null
        setActiveItemId(nextActive?.id ?? null)
        return nextItems
      })
      clearCurrentMetadata()
      setShelves(getShelves().map((s) => ({ id: s.id, name: s.name })))
    }

    void uploadAndStore()
  }

  function clearPendingItems() {
    items.forEach((item) => URL.revokeObjectURL(item.previewUrl))
    setItems([])
    clearCurrentMetadata()
  }

  return (
    <div className="space-y-6 text-white">
      <div
        className="rounded-md border border-white/6 p-6 text-center flex flex-col justify-center md:p-8"
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
            <div className="flex flex-col gap-3 sm:flex-row">
              {activeItem && (
                <div className="min-w-0 flex-1">
                  <div className="overflow-hidden rounded-lg border border-white/5 bg-[#3a3a3a]">
                    <img src={activeItem.previewUrl} alt={activeItem.file.name} className="h-80 w-full object-cover" />
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-3 text-sm text-white/60">
                    <span>
                      {items.findIndex((item) => item.id === activeItem.id) + 1} z {items.length}
                    </span>
                    <span className="truncate">{activeItem.file.name}</span>
                  </div>
                  {activeItem.error && <div className="mt-2 text-sm text-red-400">{activeItem.error}</div>}
                </div>
              )}

              {queuedItems.length > 0 && (
                <div className="flex gap-2 overflow-auto sm:w-28 sm:flex-col">
                  {queuedItems.map((it) => (
                    <button
                      type="button"
                      key={it.id}
                      onClick={() => setActiveItemId(it.id)}
                      className="h-20 w-20 shrink-0 overflow-hidden rounded border border-white/10 bg-[#3a3a3a] sm:h-24 sm:w-full"
                      aria-label={`Edytuj ${it.file.name}`}
                    >
                      <img src={it.previewUrl} alt={it.file.name} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="sm:hidden">
                <Button type="button" onClick={() => inputRef.current?.click()} variant="ghost">
                  Dodaj kolejne zdjęcia
                </Button>
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
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsColorDropdownOpen((open) => !open)}
                    className="flex w-full items-center justify-between rounded border border-white/20 bg-black/40 px-3 py-2 text-left text-white"
                    aria-haspopup="listbox"
                    aria-expanded={isColorDropdownOpen}
                  >
                    <span className="flex items-center gap-2">
                      {selectedColor ? (
                        <>
                          <span
                            className="h-4 w-4 rounded-full border border-white/30"
                            style={{ background: selectedColor.swatch }}
                            aria-hidden="true"
                          />
                          {selectedColor.label}
                        </>
                      ) : (
                        <span className="text-white/50">Wybierz kolor</span>
                      )}
                    </span>
                    <span className="text-white/60" aria-hidden="true">
                      ▾
                    </span>
                  </button>

                  {isColorDropdownOpen && (
                    <div
                      className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded border border-white/10 bg-[#252425] py-1 shadow-lg"
                      role="listbox"
                    >
                      {COLOR_OPTIONS.map((option) => (
                        <button
                          type="button"
                          key={option.value}
                          onClick={() => {
                            setColor(option.value)
                            setIsColorDropdownOpen(false)
                          }}
                          className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-white hover:bg-white/10 ${
                            color === option.value ? 'bg-white/10' : ''
                          }`}
                          role="option"
                          aria-selected={color === option.value}
                        >
                          <span
                            className="h-4 w-4 rounded-full border border-white/30"
                            style={{ background: option.swatch }}
                            aria-hidden="true"
                          />
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
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

                    // upload files to server and use returned public URLs
                    async function uploadAndSave() {
                      for (const it of items) {
                        try {
                          const toBase64 = (file: File) =>
                            new Promise<string>((resolve, reject) => {
                              const reader = new FileReader()
                              reader.onload = () => resolve((reader.result as string).split(',')[1])
                              reader.onerror = reject
                              reader.readAsDataURL(file)
                            })

                          const fileBase64 = await toBase64(it.file)
                          const res = await fetch('/api/upload', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ filename: it.file.name, fileBase64, removeBg: false }),
                          })
                          const json = await res.json()
                          const remoteUrl = json.thumbnailPath ? `storage://${json.thumbnailPath}` : (json.thumbnailUrl || json.url || it.previewUrl)

                          addItemToShelf(selectedType, remoteUrl, {
                            color: color || undefined,
                            styles: styles.length ? styles : undefined,
                            description: description || undefined,
                          })
                        } catch (e) {
                          console.error('Upload failed for', it.file.name, e)
                          // fallback to local preview
                          addItemToShelf(selectedType, it.previewUrl, {
                            color: color || undefined,
                            styles: styles.length ? styles : undefined,
                            description: description || undefined,
                          })
                        }
                      }

                      // clear selected items and refresh shelves
                      setItems([])
                      setShelves(getShelves().map((s) => ({ id: s.id, name: s.name })))
                      alert('Zapisano do wybranej półki')
                    }

                    void uploadAndSave()
                  }}
                  disabled={!selectedType}
                  className={`px-4 py-2 ${!selectedType ? 'opacity-50 pointer-events-none' : ''} bg-white text-black`}
                  type="button"
                  onClick={saveActiveItem}
                  disabled={!selectedType || !activeItem || !!activeItem.error}
                  className={`px-4 py-2 ${!selectedType || !activeItem || activeItem.error ? 'opacity-50 pointer-events-none' : ''} bg-white text-black`}
                >
                  Zapisz
                </Button>
                <Button type="button" variant="ghost" onClick={clearPendingItems}>
                  Anuluj
                </Button>
                <Button type="button" variant="ghost" onClick={() => inputRef.current?.click()} className="hidden sm:inline-flex">
                  Dodaj kolejne
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
