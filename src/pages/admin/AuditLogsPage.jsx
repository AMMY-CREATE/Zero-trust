import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Filter, FileText, User, Shield, Database, Settings } from "lucide-react";
import { SeverityBadge } from "@/components/dashboard/SeverityBadge";
import { formatDistanceToNow } from "date-fns";

const mockLogs = [
    { id: 1, timestamp: new Date(Date.now() - 120000), user: "john.doe@company.com", action: "Login", resource: "Authentication System", ip: "192.168.1.100", severity: "low", details: "Successful login from Chrome browser" },
    { id: 2, timestamp: new Date(Date.now() - 300000), user: "sarah.smith@company.com", action: "File Access", resource: "/documents/confidential.pdf", ip: "192.168.1.105", severity: "medium", details: "Downloaded sensitive document" },
    { id: 3, timestamp: new Date(Date.now() - 600000), user: "mike.j@company.com", action: "Failed Login", resource: "Authentication System", ip: "203.0.113.45", severity: "high", details: "Multiple failed login attempts detected" },
    { id: 4, timestamp: new Date(Date.now() - 900000), user: "emily.d@company.com", action: "Policy Change", resource: "Security Policies", ip: "192.168.1.110", severity: "critical", details: "Modified firewall rules" },
    { id: 5, timestamp: new Date(Date.now() - 1200000), user: "robert.b@company.com", action: "User Created", resource: "User Management", ip: "192.168.1.115", severity: "medium", details: "Created new user account" },
    { id: 6, timestamp: new Date(Date.now() - 1800000), user: "lisa.w@company.com", action: "Data Export", resource: "/api/users/export", ip: "192.168.1.120", severity: "high", details: "Exported user database" },
    { id: 7, timestamp: new Date(Date.now() - 3600000), user: "david.lee@company.com", action: "Settings Update", resource: "System Configuration", ip: "192.168.1.125", severity: "low", details: "Updated notification preferences" },
    { id: 8, timestamp: new Date(Date.now() - 7200000), user: "jen.t@company.com", action: "Permission Grant", resource: "Access Control", ip: "192.168.1.130", severity: "medium", details: "Granted admin privileges to user" },
    { id: 9, timestamp: new Date(Date.now() - 10800000), user: "system", action: "Backup", resource: "Database", ip: "127.0.0.1", severity: "low", details: "Automated database backup completed" },
    { id: 10, timestamp: new Date(Date.now() - 14400000), user: "john.doe@company.com", action: "API Access", resource: "/api/v1/threats", ip: "192.168.1.100", severity: "low", details: "Retrieved threat intelligence data" },
];

export default function AuditLogsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLog, setSelectedLog] = useState(null);
    const [filterSeverity, setFilterSeverity] = useState("all");

    const filteredLogs = mockLogs.filter(log => {
        const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.resource.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSeverity = filterSeverity === "all" || log.severity === filterSeverity;
        return matchesSearch && matchesSeverity;
    });

    const getActionIcon = (action) => {
        if (action.includes("Login")) return <User className="h-4 w-4" />;
        if (action.includes("Policy") || action.includes("Permission")) return <Shield className="h-4 w-4" />;
        if (action.includes("File") || action.includes("Data") || action.includes("Export")) return <FileText className="h-4 w-4" />;
        if (action.includes("Backup") || action.includes("Database")) return <Database className="h-4 w-4" />;
        return <Settings className="h-4 w-4" />;
    };

    const exportLogs = () => {
        const csvContent = "data:text/csv;charset=utf-8," +
            "Timestamp,User,Action,Resource,IP,Severity,Details\n" +
            filteredLogs.map(log =>
                `${log.timestamp.toISOString()},${log.user},${log.action},${log.resource},${log.ip},${log.severity},${log.details}`
            ).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `audit_logs_${new Date().toISOString()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <DashboardLayout userRole="admin" title="Audit Logs" subtitle="Security event tracking and compliance">
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Logs List */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Search and Filters */}
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search logs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant={filterSeverity === "all" ? "default" : "outline"}
                                    onClick={() => setFilterSeverity("all")}
                                    size="sm"
                                >
                                    All
                                </Button>
                                <Button
                                    variant={filterSeverity === "critical" ? "default" : "outline"}
                                    onClick={() => setFilterSeverity("critical")}
                                    size="sm"
                                >
                                    Critical
                                </Button>
                                <Button
                                    variant={filterSeverity === "high" ? "default" : "outline"}
                                    onClick={() => setFilterSeverity("high")}
                                    size="sm"
                                >
                                    High
                                </Button>
                                <Button
                                    variant={filterSeverity === "medium" ? "default" : "outline"}
                                    onClick={() => setFilterSeverity("medium")}
                                    size="sm"
                                >
                                    Medium
                                </Button>
                            </div>
                            <Button onClick={exportLogs} className="gap-2">
                                <Download className="h-4 w-4" />
                                Export
                            </Button>
                        </div>
                    </div>

                    {/* Logs Table */}
                    <div className="bg-card rounded-xl border border-border overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-muted/50 border-b border-border">
                                    <tr>
                                        <th className="text-left p-4 font-mono text-xs text-muted-foreground uppercase">Time</th>
                                        <th className="text-left p-4 font-mono text-xs text-muted-foreground uppercase">User</th>
                                        <th className="text-left p-4 font-mono text-xs text-muted-foreground uppercase">Action</th>
                                        <th className="text-left p-4 font-mono text-xs text-muted-foreground uppercase">Resource</th>
                                        <th className="text-left p-4 font-mono text-xs text-muted-foreground uppercase">Severity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLogs.map((log) => (
                                        <tr
                                            key={log.id}
                                            onClick={() => setSelectedLog(log)}
                                            className={`border-b border-border hover:bg-muted/30 cursor-pointer transition-colors ${selectedLog?.id === log.id ? 'bg-primary/5' : ''
                                                }`}
                                        >
                                            <td className="p-4 text-sm text-muted-foreground font-mono">
                                                {formatDistanceToNow(log.timestamp, { addSuffix: true })}
                                            </td>
                                            <td className="p-4 text-sm font-mono">{log.user}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    {getActionIcon(log.action)}
                                                    <span className="text-sm">{log.action}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm font-mono text-muted-foreground truncate max-w-xs">
                                                {log.resource}
                                            </td>
                                            <td className="p-4">
                                                <SeverityBadge severity={log.severity} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="bg-card rounded-xl border border-border p-4">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Showing {filteredLogs.length} of {mockLogs.length} logs
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" disabled>Previous</Button>
                                <Button variant="outline" size="sm">Next</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Log Details Panel */}
                <div className="space-y-6">
                    {selectedLog ? (
                        <>
                            <div className="bg-card rounded-xl border border-border p-6">
                                <h3 className="text-lg font-semibold mb-4">Log Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Timestamp</div>
                                        <div className="font-mono text-sm">{selectedLog.timestamp.toLocaleString()}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">User</div>
                                        <div className="font-mono text-sm">{selectedLog.user}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Action</div>
                                        <div className="flex items-center gap-2">
                                            {getActionIcon(selectedLog.action)}
                                            <span className="font-medium">{selectedLog.action}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Resource</div>
                                        <div className="font-mono text-sm break-all">{selectedLog.resource}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">IP Address</div>
                                        <div className="font-mono text-sm">{selectedLog.ip}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Severity</div>
                                        <SeverityBadge severity={selectedLog.severity} />
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Details</div>
                                        <div className="text-sm p-3 bg-muted/30 rounded-lg">{selectedLog.details}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card rounded-xl border border-border p-6">
                                <h3 className="text-lg font-semibold mb-4">Related Events</h3>
                                <div className="space-y-2">
                                    <div className="text-sm p-3 bg-muted/30 rounded-lg">
                                        <div className="font-medium mb-1">Login attempt</div>
                                        <div className="text-xs text-muted-foreground">5 mins before</div>
                                    </div>
                                    <div className="text-sm p-3 bg-muted/30 rounded-lg">
                                        <div className="font-medium mb-1">Session created</div>
                                        <div className="text-xs text-muted-foreground">2 mins before</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="bg-card rounded-xl border border-border p-6 text-center text-muted-foreground">
                            Select a log entry to view details
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
