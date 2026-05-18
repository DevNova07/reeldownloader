import { cn } from "@/utils/cn"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/5",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-linear-to-r before:from-transparent before:via-blue-500/20 before:via-pink-500/20 before:to-transparent",
        "after:absolute after:inset-0 after:bg-linear-to-br after:from-blue-600/5 after:via-purple-600/5 after:to-pink-600/5",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
