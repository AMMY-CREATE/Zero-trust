import { cn } from "@/lib/utils";

export function StatCard({ title, value, change, changeType = 'neutral', icon: Icon, iconColor }) {
    return (
        <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/30 transition-all group">
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="text-3xl font-bold">{value}</p>
                    {change && (
                        <p className={cn(
                            "text-sm",
                            changeType === 'positive' && "text-success",
                            changeType === 'negative' && "text-danger",
                            changeType === 'neutral' && "text-muted-foreground"
                        )}>
                            {change}
                        </p>
                    )}
                </div>
                <div className={cn(
                    "p-3 rounded-lg transition-transform group-hover:scale-110",
                    iconColor || "bg-primary/10"
                )}>
                    <Icon className={cn("h-6 w-6", iconColor ? "text-current" : "text-primary")} />
                </div>
            </div>
        </div>
    );
}
