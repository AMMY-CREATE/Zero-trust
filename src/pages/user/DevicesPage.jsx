import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Smartphone, Laptop, Monitor, Shield, Trash2, Plus, MapPin, Clock } from "lucide-react";

const mockDevices = [
    { id: 1, name: "iPhone 14 Pro", type: "mobile", os: "iOS 17.2", browser: "Safari", trusted: true, lastUsed: "2 mins ago", location: "New York, USA", addedDate: "Jan 15, 2024" },
    { id: 2, name: "MacBook Pro", type: "laptop", os: "macOS Sonoma", browser: "Chrome", trusted: true, lastUsed: "1 hour ago", location: "New York, USA", addedDate: "Dec 1, 2023" },
    { id: 3, name: "Windows Desktop", type: "desktop", os: "Windows 11", browser: "Edge", trusted: true, lastUsed: "Yesterday", location: "New York, USA", addedDate: "Nov 20, 2023" },
    { id: 4, name: "iPad Air", type: "mobile", os: "iPadOS 17", browser: "Safari", trusted: false, lastUsed: "3 days ago", location: "Boston, USA", addedDate: "Jan 10, 2024" },
];

export default function DevicesPage() {
    const [devices, setDevices] = useState(mockDevices);
    const [selectedDevice, setSelectedDevice] = useState(null);

    const getDeviceIcon = (type) => {
        switch (type) {
            case "mobile": return <Smartphone className="h-8 w-8 text-primary" />;
            case "laptop": return <Laptop className="h-8 w-8 text-primary" />;
            case "desktop": return <Monitor className="h-8 w-8 text-primary" />;
            default: return <Monitor className="h-8 w-8 text-primary" />;
        }
    };

    const handleRemoveDevice = (deviceId) => {
        setDevices(devices.filter(d => d.id !== deviceId));
        if (selectedDevice?.id === deviceId) {
            setSelectedDevice(null);
        }
    };

    const stats = {
        totalDevices: devices.length,
        trustedDevices: devices.filter(d => d.trusted).length,
        activeToday: devices.filter(d => d.lastUsed.includes("min") || d.lastUsed.includes("hour")).length,
    };

    return (
        <DashboardLayout userRole="user" title="My Devices" subtitle="Manage your trusted devices">
            <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-muted-foreground">Total Devices</div>
                            <Monitor className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-3xl font-bold">{stats.totalDevices}</div>
                        <div className="text-xs text-muted-foreground mt-1">Registered devices</div>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-muted-foreground">Trusted</div>
                            <Shield className="h-4 w-4 text-green-400" />
                        </div>
                        <div className="text-3xl font-bold text-green-400">{stats.trustedDevices}</div>
                        <div className="text-xs text-muted-foreground mt-1">Verified devices</div>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-muted-foreground">Active Today</div>
                            <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-3xl font-bold text-primary">{stats.activeToday}</div>
                        <div className="text-xs text-muted-foreground mt-1">Used recently</div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Devices List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Registered Devices</h3>
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                Add Device
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {devices.map((device) => (
                                <div
                                    key={device.id}
                                    onClick={() => setSelectedDevice(device)}
                                    className={`bg-card rounded-xl border cursor-pointer transition-all ${selectedDevice?.id === device.id
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border hover:border-primary/50'
                                        }`}
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-primary/10 rounded-lg">
                                                    {getDeviceIcon(device.type)}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold flex items-center gap-2">
                                                        {device.name}
                                                        {device.trusted && <Shield className="h-4 w-4 text-green-400" />}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">{device.os} • {device.browser}</p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveDevice(device.id);
                                                }}
                                                className="text-muted-foreground hover:text-red-400"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {device.location}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    Last used: {device.lastUsed}
                                                </span>
                                            </div>
                                            <span>Added {device.addedDate}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Device Details Panel */}
                    <div className="space-y-6">
                        {selectedDevice ? (
                            <>
                                <div className="bg-card rounded-xl border border-border p-6">
                                    <h3 className="text-lg font-semibold mb-4">Device Details</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-center mb-6">
                                            <div className="p-4 bg-primary/10 rounded-lg">
                                                {getDeviceIcon(selectedDevice.type)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Name</div>
                                            <div className="font-medium">{selectedDevice.name}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Type</div>
                                            <div className="font-medium capitalize">{selectedDevice.type}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Operating System</div>
                                            <div className="font-medium">{selectedDevice.os}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Browser</div>
                                            <div className="font-medium">{selectedDevice.browser}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Location</div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
                                                <span>{selectedDevice.location}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Last Used</div>
                                            <div className="text-sm">{selectedDevice.lastUsed}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Added Date</div>
                                            <div className="text-sm">{selectedDevice.addedDate}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">Trust Status</div>
                                            <div className="flex items-center gap-2">
                                                {selectedDevice.trusted ? (
                                                    <>
                                                        <Shield className="h-4 w-4 text-green-400" />
                                                        <span className="text-green-400">Trusted</span>
                                                    </>
                                                ) : (
                                                    <span className="text-yellow-400">Not Trusted</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-6">
                                        {!selectedDevice.trusted && (
                                            <Button variant="outline" className="flex-1">Trust Device</Button>
                                        )}
                                        <Button
                                            variant="destructive"
                                            className="flex-1"
                                            onClick={() => handleRemoveDevice(selectedDevice.id)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>

                                <div className="bg-card rounded-xl border border-border p-6">
                                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                                    <div className="space-y-2">
                                        <div className="text-sm p-3 bg-muted/30 rounded-lg">
                                            <div className="font-medium mb-1">Login successful</div>
                                            <div className="text-xs text-muted-foreground">{selectedDevice.lastUsed}</div>
                                        </div>
                                        <div className="text-sm p-3 bg-muted/30 rounded-lg">
                                            <div className="font-medium mb-1">Password changed</div>
                                            <div className="text-xs text-muted-foreground">2 days ago</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="bg-card rounded-xl border border-border p-6 text-center text-muted-foreground">
                                Select a device to view details
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
