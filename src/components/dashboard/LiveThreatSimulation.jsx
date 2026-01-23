import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Smartphone, Server, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const LiveThreatSimulation = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [scenario, setScenario] = useState('normal');

    const scenarios = {
        normal: {
            login_hour: 14,
            session_duration: 45,
            request_frequency: 30,
            failed_login_count: 0,
            packet_size_avg: 850,
            bytes_transferred: 15,
            port_number: 443,
            protocol_encoded: 0,
            device_trust_score: 95
        },
        bruteforce: {
            login_hour: 10,
            session_duration: 5,
            request_frequency: 120,
            failed_login_count: 15,
            packet_size_avg: 100,
            bytes_transferred: 2,
            port_number: 80,
            protocol_encoded: 0,
            device_trust_score: 10
        },
        exfiltration: {
            login_hour: 3,
            session_duration: 120,
            request_frequency: 40,
            failed_login_count: 0,
            packet_size_avg: 2500,
            bytes_transferred: 500,
            port_number: 8080,
            protocol_encoded: 0,
            device_trust_score: 80
        }
    };

    const runScan = async () => {
        setLoading(true);
        setResult(null);
        try {
            const response = await fetch('http://localhost:5000/api/scan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(scenarios[scenario])
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Scan failed, falling back to simulation:", error);

            // Simulation Fallback Logic
            setTimeout(() => {
                let simulatedResult;
                if (scenario === 'normal') {
                    simulatedResult = {
                        status: "NORMAL",
                        risk_score: 5 + Math.random() * 15,
                        anomaly_label: 1
                    };
                } else if (scenario === 'bruteforce') {
                    simulatedResult = {
                        status: "CRITICAL_THREAT",
                        risk_score: 85 + Math.random() * 10,
                        anomaly_label: -1
                    };
                } else {
                    simulatedResult = {
                        status: "ANOMALY_DETECTED",
                        risk_score: 65 + Math.random() * 15,
                        anomaly_label: -1
                    };
                }

                setResult({
                    ...simulatedResult,
                    isSimulation: true
                });
                setLoading(false);
            }, 1000);
            return;
        }
        setLoading(false);
    };

    return (
        <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        ZTADS Live Scanner
                    </h3>
                    <p className="text-sm text-muted-foreground">Run real-time behavioral analysis on this session.</p>
                </div>
                <div className="flex gap-2">
                    <select
                        className="bg-background border border-border rounded px-3 py-1 text-sm text-foreground"
                        value={scenario}
                        onChange={(e) => setScenario(e.target.value)}
                    >
                        <option value="normal">Scenario: Normal User</option>
                        <option value="bruteforce">Scenario: Brute Force</option>
                        <option value="exfiltration">Scenario: Data Exfiltration</option>
                    </select>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Input Telemetry Display */}
                <div className="bg-muted/20 p-4 rounded-lg border border-border/50">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Live Telemetry</h4>
                    <div className="space-y-2 text-sm font-mono">
                        <div className="flex justify-between">
                            <span>Request Freq:</span>
                            <span className="text-primary">{scenarios[scenario].request_frequency} /min</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Failed Logins:</span>
                            <span className="text-primary">{scenarios[scenario].failed_login_count}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Data Volume:</span>
                            <span className="text-primary">{scenarios[scenario].bytes_transferred} MB</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Device Trust:</span>
                            <span className={scenarios[scenario].device_trust_score < 50 ? "text-red-500" : "text-green-500"}>
                                {scenarios[scenario].device_trust_score}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Analysis Result */}
                <div className="flex flex-col justify-center items-center p-4">
                    {!result ? (
                        <Button
                            onClick={runScan}
                            disabled={loading}
                            className="w-full h-12 text-lg font-bold bg-primary text-black hover:bg-primary/90"
                        >
                            {loading ? "SCANNING..." : "RUN BEHAVIORAL ANALYSIS"}
                        </Button>
                    ) : (
                        <div className="w-full text-center animate-in fade-in zoom-in duration-300">
                            {result.error ? (
                                <div className="space-y-2 text-center">
                                    <div className="text-red-500 font-mono text-sm">{result.error}</div>
                                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded border border-border/50">
                                        <p className="font-semibold text-primary/80">How to Fix:</p>
                                        <p>{result.instructions}</p>
                                    </div>
                                    <Button onClick={() => setResult(null)} variant="outline" size="sm" className="mt-2">
                                        Try Again
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-4">
                                        <div className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Risk Score</div>
                                        <div className={`text-5xl font-black ${result.risk_score > 80 ? 'text-red-500' : result.risk_score > 30 ? 'text-yellow-500' : 'text-green-500'}`}>
                                            {result.risk_score.toFixed(0)}
                                        </div>
                                    </div>

                                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold border ${result.risk_score > 80 ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-green-500/10 border-green-500/50 text-green-500'}`}>
                                        {result.risk_score > 80 ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                        {result.status.replace('_', ' ')}
                                    </div>

                                    {result.isSimulation && (
                                        <div className="mt-2 text-[10px] text-muted-foreground italic">
                                            Simulation Mode: Connection to ZTADS Engine failed.
                                        </div>
                                    )}

                                    <Button onClick={() => setResult(null)} variant="ghost" className="mt-4 text-xs">
                                        Reset Scanner
                                    </Button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
