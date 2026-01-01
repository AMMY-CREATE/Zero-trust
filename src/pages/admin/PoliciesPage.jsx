import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Shield, Lock, Network, Clock, CheckCircle, XCircle } from "lucide-react";
import Switch from "@/components/Switch";

const mockPolicies = [
    { id: 1, name: "MFA Required for Admin", category: "Authentication", status: "active", priority: "critical", affected: 12, lastModified: "2 days ago", description: "Require multi-factor authentication for all admin users" },
    { id: 2, name: "Session Timeout - 30 mins", category: "Session Management", status: "active", priority: "high", affected: 245, lastModified: "1 week ago", description: "Automatically terminate inactive sessions after 30 minutes" },
    { id: 3, name: "Block Suspicious IPs", category: "Network Security", status: "active", priority: "critical", affected: 89, lastModified: "3 hours ago", description: "Automatically block IP addresses with suspicious activity" },
    { id: 4, name: "Password Complexity", category: "Authentication", status: "active", priority: "high", affected: 245, lastModified: "2 weeks ago", description: "Enforce strong password requirements (12+ chars, special characters)" },
    { id: 5, name: "File Upload Restrictions", category: "Data Protection", status: "inactive", priority: "medium", affected: 0, lastModified: "1 month ago", description: "Restrict file uploads to approved file types only" },
    { id: 6, name: "Geo-blocking", category: "Network Security", status: "active", priority: "medium", affected: 156, lastModified: "5 days ago", description: "Block access from high-risk geographic locations" },
];

export default function PoliciesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [filterCategory, setFilterCategory] = useState("all");

    const filteredPolicies = mockPolicies.filter(policy => {
        const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            policy.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === "all" || policy.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "critical": return "bg-red-500/20 text-red-400 border-red-500/30";
            case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
            case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            default: return "bg-blue-500/20 text-blue-400 border-blue-500/30";
        }
    };

    const getCategoryIcon = (category) => {
        if (category.includes("Authentication")) return <Lock className="h-4 w-4" />;
        if (category.includes("Network")) return <Network className="h-4 w-4" />;
        if (category.includes("Session")) return <Clock className="h-4 w-4" />;
        return <Shield className="h-4 w-4" />;
    };

    return (
        <DashboardLayout userRole="admin" title="Security Policies" subtitle="Manage access control and security rules">
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Policy List */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Search and Filters */}
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search policies..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant={filterCategory === "all" ? "default" : "outline"}
                                    onClick={() => setFilterCategory("all")}
                                    size="sm"
                                >
                                    All
                                </Button>
                                <Button
                                    variant={filterCategory === "Authentication" ? "default" : "outline"}
                                    onClick={() => setFilterCategory("Authentication")}
                                    size="sm"
                                >
                                    Auth
                                </Button>
                                <Button
                                    variant={filterCategory === "Network Security" ? "default" : "outline"}
                                    onClick={() => setFilterCategory("Network Security")}
                                    size="sm"
                                >
                                    Network
                                </Button>
                            </div>
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                New Policy
                            </Button>
                        </div>
                    </div>

                    {/* Policies Grid */}
                    <div className="space-y-4">
                        {filteredPolicies.map((policy) => (
                            <div
                                key={policy.id}
                                onClick={() => setSelectedPolicy(policy)}
                                className={`bg-card rounded-xl border cursor-pointer transition-all ${selectedPolicy?.id === policy.id
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:border-primary/50'
                                    }`}
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                {getCategoryIcon(policy.category)}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{policy.name}</h3>
                                                <p className="text-sm text-muted-foreground">{policy.category}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`inline-flex px-2 py-1 rounded-md border text-xs font-mono ${getPriorityColor(policy.priority)}`}>
                                                {policy.priority.toUpperCase()}
                                            </span>
                                            {policy.status === "active" ? (
                                                <CheckCircle className="h-5 w-5 text-green-400" />
                                            ) : (
                                                <XCircle className="h-5 w-5 text-muted-foreground" />
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-4">{policy.description}</p>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>{policy.affected} users affected</span>
                                        <span>Modified {policy.lastModified}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Policy Details Panel */}
                <div className="space-y-6">
                    {selectedPolicy ? (
                        <>
                            <div className="bg-card rounded-xl border border-border p-6">
                                <h3 className="text-lg font-semibold mb-4">Policy Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Name</div>
                                        <div className="font-medium">{selectedPolicy.name}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Category</div>
                                        <div className="flex items-center gap-2">
                                            {getCategoryIcon(selectedPolicy.category)}
                                            <span>{selectedPolicy.category}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Priority</div>
                                        <span className={`inline-flex px-2 py-1 rounded-md border text-xs font-mono ${getPriorityColor(selectedPolicy.priority)}`}>
                                            {selectedPolicy.priority.toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Status</div>
                                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                            <span className="capitalize">{selectedPolicy.status}</span>
                                            <div style={{ transform: 'scale(0.3)', transformOrigin: 'right' }}>
                                                <Switch />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Description</div>
                                        <div className="text-sm p-3 bg-muted/30 rounded-lg">{selectedPolicy.description}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Affected Users</div>
                                        <div className="font-medium">{selectedPolicy.affected}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Last Modified</div>
                                        <div className="text-sm">{selectedPolicy.lastModified}</div>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-6">
                                    <Button variant="outline" className="flex-1">Edit</Button>
                                    <Button variant="destructive" className="flex-1">Delete</Button>
                                </div>
                            </div>

                            <div className="bg-card rounded-xl border border-border p-6">
                                <h3 className="text-lg font-semibold mb-4">Policy Rules</h3>
                                <div className="space-y-2">
                                    <div className="text-sm p-3 bg-muted/30 rounded-lg font-mono">
                                        IF user.role == "admin" THEN require_mfa()
                                    </div>
                                    <div className="text-sm p-3 bg-muted/30 rounded-lg font-mono">
                                        IF login.failed_attempts &gt; 3 THEN block_ip()
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="bg-card rounded-xl border border-border p-6 text-center text-muted-foreground">
                            Select a policy to view details
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
