import { cn } from "@/lib/utils";

interface SeverityBadgeProps {
  severity: 'info' | 'warning' | 'critical' | 'low' | 'medium' | 'high';
}

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const getStyles = () => {
    switch (severity) {
      case 'info':
      case 'low':
        return "bg-info/20 text-info";
      case 'warning':
      case 'medium':
        return "bg-warning/20 text-warning";
      case 'critical':
      case 'high':
        return "bg-danger/20 text-danger";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium capitalize", getStyles())}>
      {severity}
    </span>
  );
}
