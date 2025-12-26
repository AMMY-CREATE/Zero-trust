import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { getUserSecurityData } from "@/lib/mockData";
import { RiskGauge } from "@/components/dashboard/RiskGauge";
import { Shield, Smartphone, Laptop, Monitor, Bell, CheckCircle, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function UserDashboard() {
    const userData = getUserSecurityData("USR-001");

    const deviceIcons = {
        mobile: Smartphone,
        laptop: Laptop,
        desktop: Monitor,
    };

    return (
        <DashboardLayout userRole="user" title="My Security" subtitle="Your account security overview">
            <div className="grid lg:grid-cols-3 gap-6">

                <div className="bg-card rounded-xl border border-border p-6 text-center">
                    <h3 className="text-lg font-semibold mb-6">Security Score</h3>
                    <RiskGauge score={userData.securityScore} label="Your Security Level" size="lg" />
                    <p className="text-sm text-muted-foreground mt-4">
                        Your account is well protected. Keep up the good security practices!
                    </p>
                </div>


                <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Login Activity</h3>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto">
                        {userData.loginHistory.map((login) => (
                            <div key={login.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                <div className="flex items-center gap-3">
                                    {login.status === 'success' ? (
                                        <CheckCircle className="h-5 w-5 text-success" />
                                    ) : (
                                        <AlertTriangle className="h-5 w-5 text-warning" />
                                    )}
                                    <div>
                                        <p className="text-sm font-medium">{login.device}</p>
                                        <p className="text-xs text-muted-foreground">{login.location}</p>
                                    </div>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(new Date(login.timestamp), { addSuffix: true })}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="text-lg font-semibold mb-4">Trusted Devices</h3>
                    <div className="space-y-3">
                        {userData.devices.map((device) => {
                            const Icon = deviceIcons[device.type] || Monitor;
                            return (
                                <div key={device.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                    <Icon className="h-5 w-5 text-primary" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{device.name}</p>
                                        <p className="text-xs text-muted-foreground">Last used: {device.lastUsed}</p>
                                    </div>
                                    {device.trusted && <Shield className="h-4 w-4 text-success" />}
                                </div>
                            );
                        })}
                    </div>
                </div>


                <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
                    <h3 className="text-lg font-semibold mb-4">Security Notifications</h3>
                    <div className="space-y-3">
                        {userData.notifications.map((notification) => (
                            <div key={notification.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                <Bell className={`h-5 w-5 ${notification.type === 'warning' ? 'text-warning' :
                                    notification.type === 'success' ? 'text-success' : 'text-info'
                                    }`} />
                                <div className="flex-1">
                                    <p className="text-sm">{notification.message}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
