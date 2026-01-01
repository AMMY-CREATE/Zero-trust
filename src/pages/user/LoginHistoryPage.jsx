import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Monitor, Smartphone, Laptop, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const mockLoginHistory = [
    { id: 1, timestamp: new Date(Date.now() - 120000), device: "Chrome on Windows", location: "New York, USA", ip: "192.168.1.100", status: "success" },
    { id: 2, timestamp: new Date(Date.now() - 3600000), device: "Safari on iPhone", location: "New York, USA", ip: "192.168.1.105", status: "success" },
    { id: 3, timestamp: new Date(Date.now() - 7200000), device: "Firefox on Linux", location: "London, UK", ip: "203.0.113.45", status: "failed" },
    { id: 4, timestamp: new Date(Date.now() - 86400000), device: "Chrome on MacOS", location: "New York, USA", ip: "192.168.1.110", status: "success" },
    { id: 5, timestamp: new Date(Date.now() - 172800000), device: "Edge on Windows", location: "San Francisco, USA", ip: "192.168.1.115", status: "success" },
    { id: 6, timestamp: new Date(Date.now() - 259200000), device: "Chrome on Android", location: "New York, USA", ip: "192.168.1.120", status: "success" },
    { id: 7, timestamp: new Date(Date.now() - 345600000), device: "Safari on iPad", location: "Boston, USA", ip: "192.168.1.125", status: "success" },
    { id: 8, timestamp: new Date(Date.now() - 432000000), device: "Chrome on Windows", location: "Tokyo, Japan", ip: "198.51.100.23", status: "failed" },
];

export default function LoginHistoryPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const filteredHistory = mockLoginHistory.filter(login => {
        const matchesSearch = login.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
            login.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            login.ip.includes(searchTerm);
        const matchesStatus = filterStatus === "all" || login.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getDeviceIcon = (device) => {
        if (device.includes("iPhone") || device.includes("Android")) return <Smartphone className="h-5 w-5 text-primary" />;
        if (device.includes("iPad")) return <Laptop className="h-5 w-5 text-primary" />;
        return <Monitor className="h-5 w-5 text-primary" />;
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "success": return <CheckCircle className="h-5 w-5 text-green-400" />;
            case "failed": return <XCircle className="h-5 w-5 text-red-400" />;
            default: return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
        }
    };

    const stats = {
        totalLogins: mockLoginHistory.length,
        successfulLogins: mockLoginHistory.filter(l => l.status === "success").length,
        failedAttempts: mockLoginHistory.filter(l => l.status === "failed").length,
        uniqueLocations: new Set(mockLoginHistory.map(l => l.location)).size,
    };

    return (
        <DashboardLayout userRole="user" title="Login History" subtitle="Track your account access activity">
            <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-muted-foreground">Total Logins</div>
                            <Monitor className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-3xl font-bold">{stats.totalLogins}</div>
                        <div className="text-xs text-muted-foreground mt-1">Last 30 days</div>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-muted-foreground">Successful</div>
                            <CheckCircle className="h-4 w-4 text-green-400" />
                        </div>
                        <div className="text-3xl font-bold text-green-400">{stats.successfulLogins}</div>
                        <div className="text-xs text-muted-foreground mt-1">Verified logins</div>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-muted-foreground">Failed Attempts</div>
                            <XCircle className="h-4 w-4 text-red-400" />
                        </div>
                        <div className="text-3xl font-bold text-red-400">{stats.failedAttempts}</div>
                        <div className="text-xs text-muted-foreground mt-1">Blocked attempts</div>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-muted-foreground">Locations</div>
                            <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-3xl font-bold text-primary">{stats.uniqueLocations}</div>
                        <div className="text-xs text-muted-foreground mt-1">Unique locations</div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by device, location, or IP..."
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
                                variant={filterStatus === "success" ? "default" : "outline"}
                                onClick={() => setFilterStatus("success")}
                                size="sm"
                            >
                                Successful
                            </Button>
                            <Button
                                variant={filterStatus === "failed" ? "default" : "outline"}
                                onClick={() => setFilterStatus("failed")}
                                size="sm"
                            >
                                Failed
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Login History Table */}
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/50 border-b border-border">
                                <tr>
                                    <th className="text-left p-4 font-mono text-xs text-muted-foreground uppercase">Time</th>
                                    <th className="text-left p-4 font-mono text-xs text-muted-foreground uppercase">Device</th>
                                    <th className="text-left p-4 font-mono text-xs text-muted-foreground uppercase">Location</th>
                                    <th className="text-left p-4 font-mono text-xs text-muted-foreground uppercase">IP Address</th>
                                    <th className="text-left p-4 font-mono text-xs text-muted-foreground uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredHistory.map((login) => (
                                    <tr key={login.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                                        <td className="p-4 text-sm text-muted-foreground font-mono">
                                            {formatDistanceToNow(login.timestamp, { addSuffix: true })}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                {getDeviceIcon(login.device)}
                                                <span className="text-sm">{login.device}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">{login.location}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm font-mono text-muted-foreground">{login.ip}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(login.status)}
                                                <span className={`text-sm capitalize ${login.status === "success" ? "text-green-400" : "text-red-400"
                                                    }`}>
                                                    {login.status}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold mb-1">Security Notice</h3>
                            <p className="text-sm text-muted-foreground">
                                If you notice any suspicious login activity or unrecognized devices, please change your password immediately and contact support.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
