import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, AlertTriangle, Clock, CheckCircle, XCircle, PlayCircle, User } from "lucide-react";
import { SeverityBadge } from "@/components/dashboard/SeverityBadge";
import { formatDistanceToNow } from "date-fns";

const mockIncidents = [
    { id: 1, title: "Brute Force Attack Detected", severity: "critical", status: "open", assignee: "John Doe", created: new Date(Date.now() - 3600000), updated: new Date(Date.now() - 1800000), description: "Multiple failed login attempts from IP 203.0.113.45", affectedSystems: ["Auth Server", "API Gateway"], timeline: [] },
    { id: 2, title: "Suspicious Data Exfiltration", severity: "high", status: "in-progress", assignee: "Sarah Smith", created: new Date(Date.now() - 7200000), updated: new Date(Date.now() - 600000), description: "Large data transfer to external IP detected", affectedSystems: ["Database", "File Server"], timeline: [] },
    { id: 3, title: "Malware Detection", severity: "critical", status: "in-progress", assignee: "Mike Johnson", created: new Date(Date.now() - 10800000), updated: new Date(Date.now() - 3600000), description: "Ransomware signature detected on endpoint", affectedSystems: ["Workstation-42"], timeline: [] },
    { id: 4, title: "Unauthorized Access Attempt", severity: "medium", status: "resolved", assignee: "Emily Davis", created: new Date(Date.now() - 86400000), updated: new Date(Date.now() - 43200000), description: "Access attempt to restricted resource", affectedSystems: ["Admin Panel"], timeline: [] },
    { id: 5, title: "DDoS Attack", severity: "high", status: "open", assignee: "Robert Brown", created: new Date(Date.now() - 1800000), updated: new Date(Date.now() - 900000), description: "High volume of requests from multiple IPs", affectedSystems: ["Web Server", "Load Balancer"], timeline: [] },
];

export default function IncidentResponsePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all");

    const filteredIncidents = mockIncidents.filter(incident => {
        const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            incident.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || incident.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusIcon = (status) => {
        switch (status) {
            case "open": return <AlertTriangle className="h-4 w-4 text-red-400" />;
            case "in-progress": return <PlayCircle className="h-4 w-4 text-yellow-400" />;
            case "resolved": return <CheckCircle className="h-4 w-4 text-green-400" />;
            default: return <XCircle className="h-4 w-4 text-muted-foreground" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "open": return "bg-red-500/20 text-red-400 border-red-500/30";
            case "in-progress": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            case "resolved": return "bg-green-500/20 text-green-400 border-green-500/30";
            default: return "bg-muted text-muted-foreground border-border";
        }
    };

    const incidentStats = {
        open: mockIncidents.filter(i => i.status === "open").length,
        inProgress: mockIncidents.filter(i => i.status === "in-progress").length,
        resolved: mockIncidents.filter(i => i.status === "resolved").length,
        avgResponseTime: "12 mins",
    };

    return (
        <DashboardLayout userRole="admin" title="Incident Response" subtitle="Security incident management and tracking">
            <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-muted-foreground">Open Incidents</div>
                            <AlertTriangle className="h-4 w-4 text-red-400" />
                        </div>
                        <div className="text-3xl font-bold text-red-400">{incidentStats.open}</div>
                        <div className="text-xs text-muted-foreground mt-1">Requires attention</div>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-muted-foreground">In Progress</div>
                            <PlayCircle className="h-4 w-4 text-yellow-400" />
                        </div>
                        <div className="text-3xl font-bold text-yellow-400">{incidentStats.inProgress}</div>
                        <div className="text-xs text-muted-foreground mt-1">Being investigated</div>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-muted-foreground">Resolved</div>
                            <CheckCircle className="h-4 w-4 text-green-400" />
                        </div>
                        <div className="text-3xl font-bold text-green-400">{incidentStats.resolved}</div>
                        <div className="text-xs text-muted-foreground mt-1">Last 24 hours</div>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-muted-foreground">Avg Response</div>
                            <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-3xl font-bold text-primary">{incidentStats.avgResponseTime}</div>
                        <div className="text-xs text-green-400 mt-1">-3 mins from last week</div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Incident List */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Search and Filters */}
                        <div className="bg-card rounded-xl border border-border p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search incidents..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant={filterStatus === "all" ? "default" : "outline"}
                                        onClick={() => setFilterStatus("all")}
                                        size="sm"
                                    >
                                        All
                                    </Button>
                                    <Button
                                        variant={filterStatus === "open" ? "default" : "outline"}
                                        onClick={() => setFilterStatus("open")}
                                        size="sm"
                                    >
                                        Open
                                    </Button>
                                    <Button
                                        variant={filterStatus === "in-progress" ? "default" : "outline"}
                                        onClick={() => setFilterStatus("in-progress")}
                                        size="sm"
                                    >
                                        In Progress
                                    </Button>
                                    <Button
                                        variant={filterStatus === "resolved" ? "default" : "outline"}
                                        onClick={() => setFilterStatus("resolved")}
                                        size="sm"
                                    >
                                        Resolved
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Incidents List */}
                        <div className="space-y-4">
                            {filteredIncidents.map((incident) => (
                                <div
                                    key={incident.id}
                                    onClick={() => setSelectedIncident(incident)}
                                    className={`bg-card rounded-xl border cursor-pointer transition-all ${selectedIncident?.id === incident.id
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border hover:border-primary/50'
                                        }`}
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-semibold">{incident.title}</h3>
                                                    <SeverityBadge severity={incident.severity} />
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-3">{incident.description}</p>
                                            </div>
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-mono ${getStatusColor(incident.status)}`}>
                                                {getStatusIcon(incident.status)}
                                                {incident.status.replace("-", " ").toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1">
                                                    <User className="h-3 w-3" />
                                                    {incident.assignee}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    Created {formatDistanceToNow(incident.created, { addSuffix: true })}
                                                </span>
                                            </div>
                                            <span>{incident.affectedSystems.length} systems affected</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Incident Details Panel */}
                    <div className="space-y-6">
                        {selectedIncident ? (
                            <>
                                <div className="bg-card rounded-xl border border-border p-6">
                                    <h3 className="text-lg font-semibold mb-4">Incident Details</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Title</div>
                                            <div className="font-medium">{selectedIncident.title}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Severity</div>
                                            <SeverityBadge severity={selectedIncident.severity} />
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Status</div>
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-mono ${getStatusColor(selectedIncident.status)}`}>
                                                {getStatusIcon(selectedIncident.status)}
                                                {selectedIncident.status.replace("-", " ").toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Assigned To</div>
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4" />
                                                <span>{selectedIncident.assignee}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Description</div>
                                            <div className="text-sm p-3 bg-muted/30 rounded-lg">{selectedIncident.description}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Affected Systems</div>
                                            <div className="space-y-1">
                                                {selectedIncident.affectedSystems.map((system, idx) => (
                                                    <div key={idx} className="text-sm p-2 bg-muted/30 rounded font-mono">
                                                        {system}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Created</div>
                                            <div className="text-sm">{formatDistanceToNow(selectedIncident.created, { addSuffix: true })}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Last Updated</div>
                                            <div className="text-sm">{formatDistanceToNow(selectedIncident.updated, { addSuffix: true })}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-6">
                                        <Button variant="outline" className="flex-1">Reassign</Button>
                                        <Button className="flex-1">Update Status</Button>
                                    </div>
                                </div>

                                <div className="bg-card rounded-xl border border-border p-6">
                                    <h3 className="text-lg font-semibold mb-4">Response Timeline</h3>
                                    <div className="space-y-3">
                                        <div className="flex gap-3">
                                            <div className="flex flex-col items-center">
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                                <div className="w-px h-full bg-border" />
                                            </div>
                                            <div className="flex-1 pb-4">
                                                <div className="text-sm font-medium">Incident created</div>
                                                <div className="text-xs text-muted-foreground">{formatDistanceToNow(selectedIncident.created, { addSuffix: true })}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="flex flex-col items-center">
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                                <div className="w-px h-full bg-border" />
                                            </div>
                                            <div className="flex-1 pb-4">
                                                <div className="text-sm font-medium">Assigned to {selectedIncident.assignee}</div>
                                                <div className="text-xs text-muted-foreground">{formatDistanceToNow(selectedIncident.updated, { addSuffix: true })}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="flex flex-col items-center">
                                                <div className="w-2 h-2 rounded-full bg-muted" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm text-muted-foreground">Investigation ongoing...</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="bg-card rounded-xl border border-border p-6 text-center text-muted-foreground">
                                Select an incident to view details
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
