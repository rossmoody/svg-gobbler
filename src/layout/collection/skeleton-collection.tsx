/**
 * The placeholder content for the colleciton page that shares styles and layout.
 */
export const SkeletonCollection = () => (
  <div className="flex min-h-screen flex-col">
    <div className="grid flex-1 grid-cols-2 content-start gap-4 bg-gray-100 dark:bg-gray-900 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: 16 }).map((_, i) => (
        <span
          key={i}
          className="h-32 animate-pulse rounded-2xl bg-white dark:border-gray-700 dark:bg-gray-800"
        />
      ))}
    </div>
  </div>
)
