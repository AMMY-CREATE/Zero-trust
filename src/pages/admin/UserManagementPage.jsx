import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, MoreVertical, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { SeverityBadge } from "@/components/dashboard/SeverityBadge";

const mockUsers = [
    { id: 1, name: "John Doe", email: "john.doe@company.com", role: "Admin", status: "active", riskScore: 15, lastActive: "2 mins ago", sessions: 3 },
    { id: 2, name: "Sarah Smith", email: "sarah.smith@company.com", role: "User", status: "active", riskScore: 8, lastActive: "5 mins ago", sessions: 1 },
    { id: 3, name: "Mike Johnson", email: "mike.j@company.com", role: "User", status: "suspended", riskScore: 78, lastActive: "2 hours ago", sessions: 0 },
    { id: 4, name: "Emily Davis", email: "emily.d@company.com", role: "Manager", status: "active", riskScore: 12, lastActive: "10 mins ago", sessions: 2 },
    { id: 5, name: "Robert Brown", email: "robert.b@company.com", role: "User", status: "active", riskScore: 45, lastActive: "1 hour ago", sessions: 1 },
    { id: 6, name: "Lisa Wilson", email: "lisa.w@company.com", role: "User", status: "inactive", riskScore: 5, lastActive: "3 days ago", sessions: 0 },
    { id: 7, name: "David Lee", email: "david.lee@company.com", role: "Admin", status: "active", riskScore: 10, lastActive: "30 mins ago", sessions: 2 },
    { id: 8, name: "Jennifer Taylor", email: "jen.t@company.com", role: "User", status: "active", riskScore: 62, lastActive: "15 mins ago", sessions: 1 },
];

export default function UserManagementPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all");

    const filteredUsers = mockUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || user.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getRiskBadge = (score) => {
        if (score < 20) return { label: "Low", color: "bg-green-500/20 text-green-400 border-green-500/30" };
        if (score < 50) return { label: "Medium", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" };
        return { label: "High", color: "bg-red-500/20 text-red-400 border-red-500/30" };
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "active": return <CheckCircle className="h-4 w-4 text-green-400" />;
            case "suspended": return <XCircle className="h-4 w-4 text-red-400" />;
            case "inactive": return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
            default: return null;
        }
    };

    return (
        <DashboardLayout userRole="admin" title="User Management" subtitle="Manage users, roles, and permissions">
            <div className="grid lg:grid-cols-3 gap-6">
                {/* User List */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Search and Filters */}
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search users..."
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
                                    variant={filterStatus === "active" ? "default" : "outline"}
                                    onClick={() => setFilterStatus("active")}
                                    size="sm"
                                >
                                    Active
                                </Button>
                                <Button
                                    variant={filterStatus === "suspended" ? "default" : "outline"}
                                    onClick={() => setFilterStatus("suspended")}
                                    size="sm"
                                >
                                    Suspended
                                </Button>
                            </div>
                            <Button className="gap-2">
                                <UserPlus className="h-4 w-4" />
                                Add User
                            </Button>
                        </div>
                    </div>

                    {/* User Table */}
                    <div className="bg-card rounded-xl border border-border overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-muted/50 border-b border-border">
                                    <tr>
                                        <th className="text-left p-4 font-mono text-xs text-muted-foreground uppercase">User</th>
                                        <th className="text-left p-4 font-mono text-xs text-muted-foreground uppercase">Role</th>
                                        <th className="text-left p-4 font-mono text-xs text-muted-foreground uppercase">Status</th>
                                        <th className="text-left p-4 font-mono text-xs text-muted-foreground uppercase">Risk</th>
                                        <th className="text-left p-4 font-mono text-xs text-muted-foreground uppercase">Last Active</th>
                                        <th className="text-left p-4 font-mono text-xs text-muted-foreground uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => {
                                        const riskBadge = getRiskBadge(user.riskScore);
                                        return (
                                            <tr
                                                key={user.id}
                                                onClick={() => setSelectedUser(user)}
                                                className={`border-b border-border hover:bg-muted/30 cursor-pointer transition-colors ${selectedUser?.id === user.id ? 'bg-primary/5' : ''
                                                    }`}
                                            >
                                                <td className="p-4">
                                                    <div>
                                                        <div className="font-medium">{user.name}</div>
                                                        <div className="text-xs text-muted-foreground">{user.email}</div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs font-mono">
                                                        {user.role === "Admin" && <Shield className="h-3 w-3" />}
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        {getStatusIcon(user.status)}
                                                        <span className="text-sm capitalize">{user.status}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`inline-flex px-2 py-1 rounded-md border text-xs font-mono ${riskBadge.color}`}>
                                                        {user.riskScore}% {riskBadge.label}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm text-muted-foreground">{user.lastActive}</td>
                                                <td className="p-4">
                                                    <Button variant="ghost" size="icon">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* User Details Panel */}
                <div className="space-y-6">
                    {selectedUser ? (
                        <>
                            <div className="bg-card rounded-xl border border-border p-6">
                                <h3 className="text-lg font-semibold mb-4">User Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Name</div>
                                        <div className="font-medium">{selectedUser.name}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Email</div>
                                        <div className="font-mono text-sm">{selectedUser.email}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Role</div>
                                        <div className="font-medium">{selectedUser.role}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Status</div>
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(selectedUser.status)}
                                            <span className="capitalize">{selectedUser.status}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Risk Score</div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${selectedUser.riskScore < 20 ? 'bg-green-500' :
                                                        selectedUser.riskScore < 50 ? 'bg-yellow-500' : 'bg-red-500'
                                                        }`}
                                                    style={{ width: `${selectedUser.riskScore}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-mono">{selectedUser.riskScore}%</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Active Sessions</div>
                                        <div className="font-medium">{selectedUser.sessions}</div>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-6">
                                    <Button variant="outline" className="flex-1">Edit</Button>
                                    <Button variant="destructive" className="flex-1">Suspend</Button>
                                </div>
                            </div>

                            <div className="bg-card rounded-xl border border-border p-6">
                                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                                <div className="space-y-3">
                                    <div className="text-sm p-3 bg-muted/30 rounded-lg">
                                        <div className="font-medium mb-1">Login from new device</div>
                                        <div className="text-xs text-muted-foreground">2 hours ago</div>
                                    </div>
                                    <div className="text-sm p-3 bg-muted/30 rounded-lg">
                                        <div className="font-medium mb-1">Password changed</div>
                                        <div className="text-xs text-muted-foreground">1 day ago</div>
                                    </div>
                                    <div className="text-sm p-3 bg-muted/30 rounded-lg">
                                        <div className="font-medium mb-1">File download</div>
                                        <div className="text-xs text-muted-foreground">2 days ago</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="bg-card rounded-xl border border-border p-6 text-center text-muted-foreground">
                            Select a user to view details
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
