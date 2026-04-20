import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-4xl text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          LookApp
        </h1>
        <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
          Your personal virtual wardrobe manager. Upload clothing photos,
          organize your closet, create outfits, and get style recommendations.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/login"
            className="rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
          >
            Zaloguj się
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
          >
            Create account
          </Link>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
        <FeatureCard
          title="Upload Clothing"
          description="Take photos of your clothes and automatically remove the background"
        />
        <FeatureCard
          title="Organize Wardrobe"
          description="Categorize and tag your items for easy browsing and searching"
        />
        <FeatureCard
          title="Create Outfits"
          description="Build outfits from your virtual closet and save your favorite looks"
        />
      </div>
    </main>
  )
}

function FeatureCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}
