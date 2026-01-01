import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, AlertTriangle, Globe, Shield, Ban, CheckCircle } from "lucide-react";
import { SeverityBadge } from "@/components/dashboard/SeverityBadge";

const mockThreats = [
    { id: 1, indicator: "203.0.113.45", type: "IP Address", severity: "critical", category: "Malware C2", firstSeen: "2 hours ago", lastSeen: "5 mins ago", confidence: 95, blocked: true },
    { id: 2, indicator: "malicious-domain.com", type: "Domain", severity: "high", category: "Phishing", firstSeen: "1 day ago", lastSeen: "30 mins ago", confidence: 88, blocked: true },
    { id: 3, indicator: "198.51.100.23", type: "IP Address", severity: "medium", category: "Scanning", firstSeen: "3 hours ago", lastSeen: "1 hour ago", confidence: 72, blocked: false },
    { id: 4, indicator: "bad-actor.net", type: "Domain", severity: "critical", category: "Ransomware", firstSeen: "6 hours ago", lastSeen: "10 mins ago", confidence: 98, blocked: true },
    { id: 5, indicator: "192.0.2.100", type: "IP Address", severity: "high", category: "Brute Force", firstSeen: "12 hours ago", lastSeen: "2 hours ago", confidence: 85, blocked: true },
    { id: 6, indicator: "suspicious-site.org", type: "Domain", severity: "low", category: "Spam", firstSeen: "1 day ago", lastSeen: "5 hours ago", confidence: 45, blocked: false },
];

const threatStats = {
    totalThreats: 1247,
    blockedToday: 89,
    criticalActive: 12,
    avgConfidence: 82,
};

export default function ThreatIntelligencePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedThreat, setSelectedThreat] = useState(null);
    const [lookupValue, setLookupValue] = useState("");

    const filteredThreats = mockThreats.filter(threat =>
        threat.indicator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        threat.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleLookup = () => {
        console.log("Looking up:", lookupValue);
        // Add lookup logic here
    };

    const handleBlock = (threat) => {
        console.log("Blocking threat:", threat);
        // Add block logic here
    };

    return (
        <DashboardLayout userRole="admin" title="Threat Intelligence" subtitle="Real-time threat monitoring and analysis">
            <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-muted-foreground">Total Threats</div>
                            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-3xl font-bold">{threatStats.totalThreats}</div>
                        <div className="text-xs text-muted-foreground mt-1">All time</div>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-muted-foreground">Blocked Today</div>
                            <Ban className="h-4 w-4 text-red-400" />
                        </div>
                        <div className="text-3xl font-bold text-red-400">{threatStats.blockedToday}</div>
                        <div className="text-xs text-green-400 mt-1">+12 from yesterday</div>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-muted-foreground">Critical Active</div>
                            <Shield className="h-4 w-4 text-red-400" />
                        </div>
                        <div className="text-3xl font-bold text-red-400">{threatStats.criticalActive}</div>
                        <div className="text-xs text-muted-foreground mt-1">Needs attention</div>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-muted-foreground">Avg Confidence</div>
                            <CheckCircle className="h-4 w-4 text-green-400" />
                        </div>
                        <div className="text-3xl font-bold text-green-400">{threatStats.avgConfidence}%</div>
                        <div className="text-xs text-muted-foreground mt-1">Detection accuracy</div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Threat List */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Lookup Tool */}
                        <div className="bg-card rounded-xl border border-border p-6">
                            <h3 className="text-lg font-semibold mb-4">Threat Lookup</h3>
                            <div className="flex gap-3">
                                <Input
                                    placeholder="Enter IP address or domain..."
                                    value={lookupValue}
                                    onChange={(e) => setLookupValue(e.target.value)}
                                    className="flex-1"
                                />
                                <Button onClick={handleLookup} className="gap-2">
                                    <Search className="h-4 w-4" />
                                    Lookup
                                </Button>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="bg-card rounded-xl border border-border p-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search threats..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Threats Table */}
                        <div className="bg-card rounded-xl border border-border overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-muted/50 border-b border-border">
                                        <tr>
                                            <th className="text-left p-4 font-mono text-xs text-muted-foreground uppercase">Indicator</th>
                                            <th className="text-left p-4 font-mono text-xs text-muted-foreground uppercase">Type</th>
                                            <th className="text-left p-4 font-mono text-xs text-muted-foreground uppercase">Category</th>
                                            <th className="text-left p-4 font-mono text-xs text-muted-foreground uppercase">Severity</th>
                                            <th className="text-left p-4 font-mono text-xs text-muted-foreground uppercase">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredThreats.map((threat) => (
                                            <tr
                                                key={threat.id}
                                                onClick={() => setSelectedThreat(threat)}
                                                className={`border-b border-border hover:bg-muted/30 cursor-pointer transition-colors ${selectedThreat?.id === threat.id ? 'bg-primary/5' : ''
                                                    }`}
                                            >
                                                <td className="p-4 font-mono text-sm">{threat.indicator}</td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        {threat.type === "IP Address" ? <Globe className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                                                        <span className="text-sm">{threat.type}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-sm">{threat.category}</td>
                                                <td className="p-4">
                                                    <SeverityBadge severity={threat.severity} />
                                                </td>
                                                <td className="p-4">
                                                    {threat.blocked ? (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-500/20 text-red-400 border border-red-500/30 text-xs">
                                                            <Ban className="h-3 w-3" />
                                                            Blocked
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs">
                                                            Monitoring
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Threat Details Panel */}
                    <div className="space-y-6">
                        {selectedThreat ? (
                            <>
                                <div className="bg-card rounded-xl border border-border p-6">
                                    <h3 className="text-lg font-semibold mb-4">Threat Details</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Indicator</div>
                                            <div className="font-mono text-sm break-all">{selectedThreat.indicator}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Type</div>
                                            <div className="font-medium">{selectedThreat.type}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Category</div>
                                            <div className="font-medium">{selectedThreat.category}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Severity</div>
                                            <SeverityBadge severity={selectedThreat.severity} />
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Confidence</div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary"
                                                        style={{ width: `${selectedThreat.confidence}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-mono">{selectedThreat.confidence}%</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">First Seen</div>
                                            <div className="text-sm">{selectedThreat.firstSeen}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Last Seen</div>
                                            <div className="text-sm">{selectedThreat.lastSeen}</div>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        {selectedThreat.blocked ? (
                                            <Button variant="outline" className="w-full">Unblock</Button>
                                        ) : (
                                            <Button variant="destructive" className="w-full" onClick={() => handleBlock(selectedThreat)}>
                                                Block Threat
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-card rounded-xl border border-border p-6">
                                    <h3 className="text-lg font-semibold mb-4">Related Indicators</h3>
                                    <div className="space-y-2">
                                        <div className="text-sm p-3 bg-muted/30 rounded-lg font-mono">
                                            203.0.113.46
                                        </div>
                                        <div className="text-sm p-3 bg-muted/30 rounded-lg font-mono">
                                            203.0.113.47
                                        </div>
                                        <div className="text-sm p-3 bg-muted/30 rounded-lg font-mono">
                                            related-domain.com
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="bg-card rounded-xl border border-border p-6 text-center text-muted-foreground">
                                Select a threat to view details
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
