export default function DashboardLoading() {
  return (
    <div className="p-6 space-y-4">
      <div className="h-10 w-52 rounded-lg bg-muted animate-pulse" />

      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-32 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    </div>
  );
}
