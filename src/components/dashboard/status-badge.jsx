import { cn } from "cn";

const STYLES = {
  pending: "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-400",
  confirmed: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-400",
  completed: "bg-sky-500/10 text-sky-700 ring-sky-500/20 dark:text-sky-400",
  cancelled: "bg-rose-500/10 text-rose-700 ring-rose-500/20 dark:text-rose-400",
  active: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-400",
  inactive: "bg-muted text-muted-foreground ring-border",
  success: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-400",
  failed: "bg-rose-500/10 text-rose-700 ring-rose-500/20 dark:text-rose-400",
  refunded: "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-400",
};

export function StatusBadge({ status, className }) {
  const key = String(status || "").toLowerCase();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset",
        STYLES[key] || STYLES.inactive,
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
