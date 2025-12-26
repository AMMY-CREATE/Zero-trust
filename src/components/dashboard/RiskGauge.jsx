import { cn } from "@/lib/utils";

export function RiskGauge({ score, label, size = 'md' }) {
    const getColor = () => {
        if (score >= 70) return 'text-success';
        if (score >= 40) return 'text-warning';
        return 'text-danger';
    };

    const getBgColor = () => {
        if (score >= 70) return 'stroke-success';
        if (score >= 40) return 'stroke-warning';
        return 'stroke-danger';
    };

    const dimensions = {
        sm: { size: 80, stroke: 8, fontSize: 'text-xl' },
        md: { size: 120, stroke: 10, fontSize: 'text-3xl' },
        lg: { size: 160, stroke: 12, fontSize: 'text-4xl' },
    };

    const { size: svgSize, stroke, fontSize } = dimensions[size];
    const radius = (svgSize - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = (score / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width: svgSize, height: svgSize }}>
                <svg
                    width={svgSize}
                    height={svgSize}
                    className="transform -rotate-90"
                >

                    <circle
                        cx={svgSize / 2}
                        cy={svgSize / 2}
                        r={radius}
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth={stroke}
                    />

                    <circle
                        cx={svgSize / 2}
                        cy={svgSize / 2}
                        r={radius}
                        fill="none"
                        className={getBgColor()}
                        strokeWidth={stroke}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - progress}
                        style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={cn(fontSize, 'font-bold', getColor())}>
                        {score}%
                    </span>
                </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{label}</p>
        </div>
    );
}
