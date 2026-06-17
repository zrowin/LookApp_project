import * as React from 'react';
import { Button } from '@/components/ui/button';
import { getShelves, addShelf as addShelfUtil, addItemToShelf } from '@/lib/shelves';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_SAVED_IMAGE_DIMENSION = 500;
const FALLBACK_IMAGE_QUALITY = 0.95;

const COLOR_OPTIONS = [
  { label: 'Czarny', value: 'czarny', swatch: '#000000' },
  { label: 'Biały', value: 'biały', swatch: '#ffffff' },
  { label: 'Szary', value: 'szary', swatch: '#8a8a8a' },
  { label: 'Beżowy', value: 'beżowy', swatch: '#d8c3a5' },
  { label: 'Brązowy', value: 'brązowy', swatch: '#8b5a2b' },
  { label: 'Żółty', value: 'żółty', swatch: '#facc15' },
  { label: 'Pomarańczowy', value: 'pomarańczowy', swatch: '#f97316' },
  { label: 'Czerwony', value: 'czerwony', swatch: '#ef4444' },
  { label: 'Różowy', value: 'różowy', swatch: '#ec4899' },
  { label: 'Fioletowy', value: 'fioletowy', swatch: '#8b5cf6' },
  { label: 'Niebieski', value: 'niebieski', swatch: '#3b82f6' },
  { label: 'Zielony', value: 'zielony', swatch: '#22c55e' },
  {
    label: 'Wielobarwny',
    value: 'wielobarwny',
    swatch: 'conic-gradient(#ef4444, #facc15, #22c55e, #3b82f6, #8b5cf6, #ef4444)',
  },
];

type FileMeta = {
  id: string;
  file: File;
  previewUrl: string;
  processedPreviewUrl?: string;
  processedFileName?: string;
  isRemovingBg?: boolean;
  removeBgError?: string;
  error?: string;
};

type QueuedUpload = {
  shelfId?: string;
  files?: File[];
};

const UPLOAD_QUEUE_KEY = '__lookappUploadQueue';

export function Upload() {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [items, setItems] = React.useState<FileMeta[]>([]);
  const [activeItemId, setActiveItemId] = React.useState<string | null>(null);
  const [selectedType, setSelectedType] = React.useState<string>('');
  const [typeError, setTypeError] = React.useState(false);
  const [color, setColor] = React.useState<string>('');
  const [isColorDropdownOpen, setIsColorDropdownOpen] = React.useState(false);
  const [styles, setStyles] = React.useState<string[]>([]);
  const [availableStyles, setAvailableStyles] = React.useState<string[]>([
    'Casual',
    'Formal',
    'Sport',
    'Street',
    'Vintage',
  ]);
  const [description, setDescription] = React.useState<string>('');
  const [shelves, setShelves] = React.useState<{ id: string; name: string }[]>([]);

  const itemsRef = React.useRef<FileMeta[]>([]);
  const activeItem = items.find((item) => item.id === activeItemId) ?? items[0];
  const queuedItems = items.filter((item) => item.id !== activeItem?.id);
  const selectedColor = COLOR_OPTIONS.find((option) => option.value === color);

  // keep ref in sync with items
  React.useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  // revoke any remaining object URLs only when component unmounts
  React.useEffect(() => {
    return () => {
      itemsRef.current.forEach((it) => URL.revokeObjectURL(it.previewUrl));
    };
  }, []);

  React.useEffect(() => {
    setShelves(getShelves().map((s) => ({ id: s.id, name: s.name })));
  }, []);

  React.useEffect(() => {
    if (items.length === 0) {
      setActiveItemId(null);
      return;
    }

    if (!activeItemId || !items.some((item) => item.id === activeItemId)) {
      setActiveItemId(items[0].id);
    }
  }, [activeItemId, items]);

  function validateFile(file: File): string | undefined {
    if (!file.type.startsWith('image/')) return 'Nieobsługiwany typ pliku';
    if (file.size > MAX_FILE_SIZE) return 'Plik przekracza maks. rozmiar 10 MB';
    return undefined;
  }

  function addFileArray(files: File[]) {
    const newItems: FileMeta[] = files.map((file) => {
      const previewUrl = URL.createObjectURL(file);
      return {
        id: `${file.name}-${file.size}-${Date.now()}`,
        file,
        previewUrl,
        error: validateFile(file),
      };
    });
    setItems((prev) => [...prev, ...newItems]);
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    addFileArray(Array.from(list));
  }

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const queuedUpload = (window as any)[UPLOAD_QUEUE_KEY] as QueuedUpload | undefined;
    if (!queuedUpload) return;

    delete (window as any)[UPLOAD_QUEUE_KEY];

    if (queuedUpload.shelfId) {
      setSelectedType(queuedUpload.shelfId);
      setTypeError(false);
    }

    if (queuedUpload.files?.length) {
      addFileArray(queuedUpload.files);
    }
  }, []);

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    addFiles(e.target.files);
    e.currentTarget.value = '';
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function removeItem(id: string) {
    setItems((prev) => {
      const toRemove = prev.find((p) => p.id === id);
      if (toRemove) URL.revokeObjectURL(toRemove.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  }

  function clearCurrentMetadata() {
    setColor('');
    setStyles([]);
    setDescription('');
    setIsColorDropdownOpen(false);
    setTypeError(false);
  }

  function toBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function getDataUrlBase64(dataUrl: string) {
    return dataUrl.split(',')[1] || '';
  }

  function readFileAsDataUrl(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function loadImage(dataUrl: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = dataUrl;
    });
  }

  function getCanvasMimeType(preferredType?: string) {
    if (
      preferredType === 'image/png' ||
      preferredType === 'image/webp' ||
      preferredType === 'image/jpeg'
    ) {
      return preferredType;
    }

    return 'image/jpeg';
  }

  async function resizeDataUrlToSavedSize(dataUrl: string, preferredType?: string) {
    const image = await loadImage(dataUrl);
    const sourceWidth = image.naturalWidth || image.width;
    const sourceHeight = image.naturalHeight || image.height;
    const longestSide = Math.max(sourceWidth, sourceHeight);

    if (!sourceWidth || !sourceHeight || longestSide <= MAX_SAVED_IMAGE_DIMENSION) {
      return dataUrl;
    }

    const scale = MAX_SAVED_IMAGE_DIMENSION / longestSide;
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(sourceWidth * scale);
    canvas.height = Math.round(sourceHeight * scale);

    const context = canvas.getContext('2d');
    if (!context) return dataUrl;

    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const outputType = getCanvasMimeType(preferredType);
    if (outputType === 'image/png') {
      return canvas.toDataURL(outputType);
    }

    return canvas.toDataURL(outputType, FALLBACK_IMAGE_QUALITY);
  }

  async function removeBackgroundFromActiveItem() {
    if (!activeItem || activeItem.error || activeItem.isRemovingBg) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === activeItem.id ? { ...item, isRemovingBg: true, removeBgError: undefined } : item
      )
    );

    try {
      const fileBase64 = await toBase64(activeItem.file);
      const res = await fetch('/api/remove-bg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: activeItem.file.name,
          mimeType: activeItem.file.type,
          fileBase64,
        }),
      });
      const json = await res.json();

      if (!res.ok || !json?.dataUrl) {
        throw new Error(json?.error || 'Nie udało się usunąć tła');
      }

      setItems((prev) =>
        prev.map((item) =>
          item.id === activeItem.id
            ? {
                ...item,
                processedPreviewUrl: json.dataUrl,
                processedFileName: json.filename,
                isRemovingBg: false,
                removeBgError: undefined,
              }
            : item
        )
      );
    } catch (err: any) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === activeItem.id
            ? {
                ...item,
                isRemovingBg: false,
                removeBgError: err?.message || 'Nie udało się usunąć tła',
              }
            : item
        )
      );
    }
  }

  function saveActiveItem() {
    if (!activeItem || activeItem.error) return;

    if (!selectedType) {
      setTypeError(true);
      return;
    }

    async function uploadAndStore() {
      let remoteUrl = '';

      // try uploading to server to get a persistent storage path
      try {
        const fileBase64 = activeItem.processedPreviewUrl
          ? getDataUrlBase64(activeItem.processedPreviewUrl)
          : await toBase64(activeItem.file);
        const filename = activeItem.processedPreviewUrl
          ? activeItem.processedFileName ||
            `${activeItem.file.name.replace(/\.[^.]+$/, '')}-no-bg.png`
          : activeItem.file.name;
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename,
            fileBase64,
            contentType: activeItem.processedPreviewUrl ? 'image/png' : activeItem.file.type,
            removeBg: Boolean(activeItem.processedPreviewUrl),
          }),
        });
        const json = await res.json();
        if (json?.url && json?.originalPath) {
          remoteUrl = `storage://${json.originalPath}`;
        } else if (json?.url) {
          remoteUrl = json.url;
        } else if (json?.thumbnailUrl?.startsWith('data:')) {
          remoteUrl = json.thumbnailUrl;
        } else if (json?.thumbnailPath) {
          remoteUrl = `storage://${json.thumbnailPath}`;
        } else if (json?.thumbnailUrl) {
          remoteUrl = json.thumbnailUrl;
        }
      } catch (e) {
        console.warn('Upload failed, falling back to data URI', e);
      }

      // fallback: if upload didn't produce a remote URL, store data URI for persistence
      if (!remoteUrl) {
        try {
          if (activeItem.processedPreviewUrl) {
            remoteUrl = await resizeDataUrlToSavedSize(activeItem.processedPreviewUrl, 'image/png');
          } else {
            const dataUrl = await readFileAsDataUrl(activeItem.file);
            remoteUrl = await resizeDataUrlToSavedSize(dataUrl, activeItem.file.type);
          }
        } catch (e) {
          // last resort, keep previewUrl (may be ephemeral)
          remoteUrl = activeItem.previewUrl;
        }
      }

      addItemToShelf(selectedType, remoteUrl, {
        color: color || undefined,
        styles: styles.length ? styles : undefined,
        description: description || undefined,
      });

      setItems((prev) => {
        const activeIndex = prev.findIndex((item) => item.id === activeItem.id);
        const nextItems = prev.filter((item) => item.id !== activeItem.id);
        const nextActive =
          nextItems[activeIndex] ?? nextItems[activeIndex - 1] ?? nextItems[0] ?? null;
        setActiveItemId(nextActive?.id ?? null);
        return nextItems;
      });
      clearCurrentMetadata();
      setShelves(getShelves().map((s) => ({ id: s.id, name: s.name })));
    }

    void uploadAndStore();
  }

  function clearPendingItems() {
    items.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    setItems([]);
    clearCurrentMetadata();
  }

  return (
    <div className="space-y-6 text-white">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={onInputChange}
        className="hidden"
      />

      {items.length === 0 && (
        <div className="space-y-3">
          <p className="text-center text-sm text-white/60">
            Najlepiej sprawdzą się zdjęcia, na których ubranie jest dobrze ułożone, widoczne w
            całości i leży na możliwie jednolitym tle.
          </p>

          <div
            className="flex flex-col justify-center rounded-md border border-white/6 p-6 text-center md:p-8"
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={{ backgroundColor: '#252425', minHeight: '40vh' }}
          >
            <div className="mb-4 flex items-center justify-center">
              <svg
                className="h-10 w-10 text-white/90"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 16V8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 12l4-4 4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="16"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
            <p className="mb-3 text-lg text-white">Przeciągnij pliki tutaj lub wybierz z dysku</p>
            <div className="flex items-center justify-center gap-3">
              <Button onClick={() => inputRef.current?.click()} className="bg-white text-black">
                Wybierz pliki
              </Button>
              <div className="text-sm text-gray-300">Max 10 MB na plik. Tylko obrazy.</div>
            </div>
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div className="space-y-4 rounded-lg bg-black/40 p-4">
          <h4 className="text-lg font-semibold">Podgląd i kategoryzacja</h4>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-3 sm:flex-row">
              {activeItem && (
                <div className="min-w-0 flex-1">
                  <div className="flex max-h-[32rem] items-center justify-center overflow-hidden rounded-lg">
                    <img
                      src={activeItem.processedPreviewUrl || activeItem.previewUrl}
                      alt={activeItem.file.name}
                      className="h-auto max-h-[32rem] w-auto max-w-full rounded-lg border border-white/5 object-contain"
                    />
                  </div>
                  {activeItem.error && (
                    <div className="mt-2 text-sm text-red-400">{activeItem.error}</div>
                  )}
                  {activeItem.processedPreviewUrl && (
                    <div className="mt-2 text-sm text-emerald-300">
                      Tlo zostalo usuniete. Ten wariant zostanie zapisany.
                    </div>
                  )}
                  {activeItem.removeBgError && (
                    <div className="mt-2 text-sm text-red-400">{activeItem.removeBgError}</div>
                  )}
                </div>
              )}

              {queuedItems.length > 0 && (
                <div className="flex items-start gap-2 overflow-auto sm:w-28 sm:flex-col">
                  {queuedItems.map((it) => (
                    <button
                      type="button"
                      key={it.id}
                      onClick={() => setActiveItemId(it.id)}
                      className="shrink-0 overflow-hidden rounded border border-white/10 bg-transparent p-0 sm:w-full"
                      aria-label={`Edytuj ${it.file.name}`}
                    >
                      <img
                        src={it.processedPreviewUrl || it.previewUrl}
                        alt={it.file.name}
                        className="block h-auto max-h-24 w-auto max-w-24 object-contain sm:max-h-none sm:w-full sm:max-w-full"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="sm:hidden">
                <Button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  variant="ghost"
                  className="upload-add-more-button"
                >
                  Dodaj kolejne zdjęcia
                </Button>
              </div>
            </div>

            <form className="space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium">Typ ubrania (wymagane)</label>
                <select
                  value={selectedType}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v === '__add__') {
                      const name = window.prompt('Nazwa półki');
                      if (name) {
                        const s = addShelfUtil(name);
                        setShelves((prev) => [...prev, { id: s.id, name: s.name }]);
                        setSelectedType(s.id);
                        setTypeError(false);
                      }
                    } else {
                      setSelectedType(v);
                      setTypeError(false);
                    }
                  }}
                  className={`w-full rounded border bg-black/40 px-3 py-2 text-white ${
                    typeError ? 'border-red-500' : 'border-white/20'
                  }`}
                >
                  <option value="">Wybierz półkę</option>
                  {shelves.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                  <option value="__add__">+ Dodaj nową półkę</option>
                </select>
                {typeError && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-red-400">
                    <span
                      className="flex h-4 w-4 items-center justify-center rounded-full border border-red-400 text-xs leading-none"
                      aria-hidden="true"
                    >
                      ×
                    </span>
                    <span>Nie wybrano typu ubrania.</span>
                  </div>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Kolor</label>
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
                            setColor(option.value);
                            setIsColorDropdownOpen(false);
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
                <label className="mb-1 block text-sm font-medium">Styl (możesz wybrać kilka)</label>
                <div className="flex flex-wrap gap-2">
                  {availableStyles.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() =>
                        setStyles((prev) =>
                          prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
                        )
                      }
                      className={`rounded-full px-3 py-1 text-sm ${styles.includes(s) ? 'bg-white text-black' : 'border border-white/10 bg-transparent text-white'}`}
                    >
                      {s}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      const name = window.prompt('Podaj nazwę stylu');
                      if (!name) return;
                      const trimmed = name.trim();
                      if (!trimmed) return;
                      if (!availableStyles.includes(trimmed)) {
                        setAvailableStyles((prev) => [...prev, trimmed]);
                      }
                      setStyles((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
                    }}
                    className="rounded-full border border-dashed border-white/20 bg-transparent px-3 py-1 text-sm text-white"
                  >
                    + Dodaj styl
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Opis</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded border bg-black/40 px-3 py-2 text-white"
                  rows={3}
                />
              </div>

              <div className="rounded border border-white/10 bg-black/30 p-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm font-medium text-white">Usun tlo ze zdjecia</div>
                    <div className="mt-1 text-xs text-white/55">
                      Po przetworzeniu podglad po lewej zmieni sie na wersje bez tla.
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={removeBackgroundFromActiveItem}
                    disabled={!activeItem || !!activeItem.error || !!activeItem.isRemovingBg}
                    className="shrink-0"
                  >
                    {activeItem?.isRemovingBg
                      ? 'Przetwarzanie...'
                      : activeItem?.processedPreviewUrl
                        ? 'Usun ponownie'
                        : 'Usun tlo'}
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  onClick={saveActiveItem}
                  disabled={!activeItem || !!activeItem.error}
                  className={`bg-white px-4 py-2 text-black ${
                    !activeItem || activeItem.error ? 'opacity-50' : ''
                  }`}
                >
                  Zapisz
                </Button>
                <Button type="button" variant="ghost" onClick={clearPendingItems}>
                  Anuluj
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => inputRef.current?.click()}
                  className="upload-add-more-button hidden sm:inline-flex"
                >
                  Dodaj kolejne
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

Upload.displayName = 'Upload';
