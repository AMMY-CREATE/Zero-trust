import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { generateAnomalies } from "@/lib/mockData";
import { SeverityBadge } from "@/components/dashboard/SeverityBadge";
import { AnomalyExplanation } from "@/components/dashboard/AnomalyExplanation";
import { formatDistanceToNow } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LiveThreatSimulation } from "@/components/dashboard/LiveThreatSimulation";

export default function AnomalyDetectionPage() {
    const anomalies = generateAnomalies(15);
    const [selectedAnomaly, setSelectedAnomaly] = useState(anomalies[0]);

    const chartData = [
        { name: 'Normal', value: 85, fill: 'hsl(var(--success))' },
        { name: 'Anomalous', value: 15, fill: 'hsl(var(--danger))' },
    ];

    return (
        <DashboardLayout userRole="admin" title="Anomaly Detection" subtitle="ML-powered threat identification">
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3">
                    <LiveThreatSimulation />
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card rounded-xl border border-border p-6">
                        <h3 className="text-lg font-semibold mb-4">Detected Anomalies</h3>
                        <div className="space-y-3 max-h-[500px] overflow-y-auto">
                            {anomalies.map((anomaly) => (
                                <div
                                    key={anomaly.id}
                                    onClick={() => setSelectedAnomaly(anomaly)}
                                    className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedAnomaly?.id === anomaly.id
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border hover:border-primary/50 bg-muted/30'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium">{anomaly.type}</span>
                                        <SeverityBadge severity={anomaly.severity} />
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">{anomaly.description}</p>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>User: {anomaly.userName}</span>
                                        <span>Score: {(anomaly.anomalyScore * 100).toFixed(0)}%</span>
                                        <span>{formatDistanceToNow(new Date(anomaly.timestamp), { addSuffix: true })}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="bg-card rounded-xl border border-border p-6">
                        <h3 className="text-lg font-semibold mb-4">Detection Distribution</h3>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                                    <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" />
                                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>


                <div className="space-y-6">
                    {selectedAnomaly && <AnomalyExplanation anomaly={selectedAnomaly} />}

                    <div className="bg-card rounded-xl border border-border p-6">
                        <h3 className="font-semibold mb-4">Feature Weights</h3>
                        {selectedAnomaly && (
                            <div className="space-y-3">
                                {Object.entries(selectedAnomaly.features).map(([key, value]) => (
                                    <div key={key}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-muted-foreground capitalize">{key.replace(/_/g, ' ')}</span>
                                            <span>{(value * 100).toFixed(0)}%</span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-primary rounded-full" style={{ width: `${value * 100}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
