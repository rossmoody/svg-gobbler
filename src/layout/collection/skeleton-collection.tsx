export const SkeletonCollection = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    {Array.from({ length: 9 }).map((_, i) => (
      <div
        key={i}
        className="flex-1 p-4 rounded-lg animate-pulse dark:border-gray-700 bg-white darK:bg-gray-800"
      >
        <div className="h-48 mb-4 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
        <div className="flex items-center mt-4 space-x-3">
          <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 flex-1"></div>
          <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-8"></div>
        </div>
      </div>
    ))}
  </div>
)
