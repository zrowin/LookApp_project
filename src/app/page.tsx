import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-between items-center bg-white text-black p-6">
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-2xl text-center px-4">
          <div className="mb-2 text-sm text-gray-700">Welcome to</div>
          <h1 className="mb-6 text-6xl sm:text-7xl font-extrabold leading-tight">LookApp</h1>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center mt-4">
            <Link
              href="/login"
              className="w-48 text-center rounded-md bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
            >
              Zaloguj się
            </Link>

            <Link
              href="/register"
              className="w-48 text-center rounded-md border border-black bg-transparent px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-100"
            >
              Utwórz konto
            </Link>
          </div>
        </div>
      </div>

      <section className="w-full">
        <div className="mx-auto max-w-5xl px-4 pb-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-gray-300 p-6">
              <p className="text-base text-black">
                Organizuj swoją szafę: twórz sekcje i przechowuj ubrania w porządku,
                aby łatwo je przeglądać i zarządzać kolekcją.
              </p>
            </div>

            <div className="rounded-lg border border-gray-300 p-6">
              <p className="text-base text-black">
                Twórz stylizacje metodą drag & drop: przeciągaj elementy na canvas,
                układaj i eksperymentuj z wyglądem outfitów.
              </p>
            </div>

            <div className="rounded-lg border border-gray-300 p-6">
              <p className="text-base text-black">
                Zapisuj ulubione outfity: zachowuj swoje najlepsze zestawy i szybki
                dostęp do nich później.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
