export const SkeletonCollection = () => (
  <div className="min-h-screen flex flex-col">
    <section className="top-bar">
      <span className="h-6 bg-gray-100 rounded-full dark:bg-gray-700 w-40"></span>
      <span className="flex-1"></span>
      <span className="h-6 bg-gray-100 rounded-full dark:bg-gray-700 w-20"></span>
      <span className="h-6 bg-gray-100 rounded-full dark:bg-gray-700 w-12"></span>
    </section>
    <aside className="main-bar">
      <span className="h-3 bg-gray-100 rounded-full dark:bg-gray-700 w-24"></span>
      <span className="flex-1"></span>
      <span className="h-3 bg-gray-100 rounded-full dark:bg-gray-700 w-12"></span>
      <span className="h-3 bg-gray-100 rounded-full dark:bg-gray-700 w-12"></span>
    </aside>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 bg-gray-100 dark:bg-gray-900 flex-1 content-start p-6">
      {Array.from({ length: 16 }).map((_, i) => (
        <span
          key={i}
          className="rounded-2xl animate-pulse dark:border-gray-700 bg-white dark:bg-gray-800 h-40"
        />
      ))}
    </div>
  </div>
)
