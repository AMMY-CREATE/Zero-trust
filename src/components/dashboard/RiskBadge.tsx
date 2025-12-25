import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  level: 'low' | 'medium' | 'high';
  showLabel?: boolean;
}

export function RiskBadge({ level, showLabel = true }: RiskBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        level === 'low' && "bg-success/20 text-success",
        level === 'medium' && "bg-warning/20 text-warning",
        level === 'high' && "bg-danger/20 text-danger"
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          level === 'low' && "bg-success",
          level === 'medium' && "bg-warning",
          level === 'high' && "bg-danger"
        )}
      />
      {showLabel && <span className="capitalize">{level}</span>}
    </span>
  );
}
