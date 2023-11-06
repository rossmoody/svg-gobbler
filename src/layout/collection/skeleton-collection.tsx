/**
 * The placeholder content for the colleciton page that shares styles and layout.
 */
export const SkeletonCollection = () => (
  <div className="min-h-screen flex flex-col">
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 bg-gray-100 dark:bg-gray-900 flex-1 content-start">
      {Array.from({ length: 16 }).map((_, i) => (
        <span
          key={i}
          className="rounded-2xl animate-pulse dark:border-gray-700 bg-white dark:bg-gray-800 h-32"
        />
      ))}
    </div>
  </div>
)
