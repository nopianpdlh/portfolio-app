export default function ProjectsLoading() {
  return (
    <div className="space-y-8">
      {/* Filters skeleton */}
      <div className="flex flex-wrap gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 w-24 bg-muted rounded-md animate-pulse" />
        ))}
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-96 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  )
}
