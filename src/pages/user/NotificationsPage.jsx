import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, AlertTriangle, Info, Trash2, Check } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const mockNotifications = [
    { id: 1, type: "success", title: "Login Successful", message: "You logged in from Chrome on Windows", timestamp: new Date(Date.now() - 120000), read: false },
    { id: 2, type: "warning", title: "New Device Detected", message: "A new device was added to your account from New York, USA", timestamp: new Date(Date.now() - 3600000), read: false },
    { id: 3, type: "info", title: "Password Expiry", message: "Your password will expire in 30 days. Consider changing it soon.", timestamp: new Date(Date.now() - 7200000), read: true },
    { id: 4, type: "success", title: "Security Update", message: "Your security settings have been updated successfully", timestamp: new Date(Date.now() - 86400000), read: true },
    { id: 5, type: "warning", title: "Failed Login Attempt", message: "Someone tried to log in to your account from London, UK", timestamp: new Date(Date.now() - 172800000), read: false },
    { id: 6, type: "info", title: "Account Activity", message: "Your account was accessed from a new location", timestamp: new Date(Date.now() - 259200000), read: true },
    { id: 7, type: "success", title: "MFA Enabled", message: "Multi-factor authentication has been enabled for your account", timestamp: new Date(Date.now() - 345600000), read: true },
];

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState(mockNotifications);
    const [filter, setFilter] = useState("all");

    const filteredNotifications = notifications.filter(notif => {
        if (filter === "unread") return !notif.read;
        if (filter === "read") return notif.read;
        return true;
    });

    const getNotificationIcon = (type) => {
        switch (type) {
            case "success": return <CheckCircle className="h-5 w-5 text-green-400" />;
            case "warning": return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
            case "info": return <Info className="h-5 w-5 text-blue-400" />;
            default: return <Bell className="h-5 w-5 text-muted-foreground" />;
        }
    };

    const getNotificationBg = (type, read) => {
        if (read) return "bg-muted/30";
        switch (type) {
            case "success": return "bg-green-500/10 border-green-500/20";
            case "warning": return "bg-yellow-500/10 border-yellow-500/20";
            case "info": return "bg-blue-500/10 border-blue-500/20";
            default: return "bg-muted/30";
        }
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const stats = {
        total: notifications.length,
        unread: notifications.filter(n => !n.read).length,
        warnings: notifications.filter(n => n.type === "warning").length,
    };

    return (
        <DashboardLayout userRole="user" title="Notifications" subtitle="Stay updated on your account activity">
            <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-muted-foreground">Total</div>
                            <Bell className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-3xl font-bold">{stats.total}</div>
                        <div className="text-xs text-muted-foreground mt-1">All notifications</div>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-muted-foreground">Unread</div>
                            <Bell className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-3xl font-bold text-primary">{stats.unread}</div>
                        <div className="text-xs text-muted-foreground mt-1">Needs attention</div>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-muted-foreground">Warnings</div>
                            <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        </div>
                        <div className="text-3xl font-bold text-yellow-400">{stats.warnings}</div>
                        <div className="text-xs text-muted-foreground mt-1">Security alerts</div>
                    </div>
                </div>

                {/* Filters and Actions */}
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex gap-2">
                            <Button
                                variant={filter === "all" ? "default" : "outline"}
                                onClick={() => setFilter("all")}
                                size="sm"
                            >
                                All
                            </Button>
                            <Button
                                variant={filter === "unread" ? "default" : "outline"}
                                onClick={() => setFilter("unread")}
                                size="sm"
                            >
                                Unread ({stats.unread})
                            </Button>
                            <Button
                                variant={filter === "read" ? "default" : "outline"}
                                onClick={() => setFilter("read")}
                                size="sm"
                            >
                                Read
                            </Button>
                        </div>
                        <Button onClick={markAllAsRead} variant="outline" size="sm" className="gap-2">
                            <Check className="h-4 w-4" />
                            Mark All as Read
                        </Button>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="space-y-3">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`bg-card rounded-xl border transition-all ${getNotificationBg(notification.type, notification.read)
                                    } ${!notification.read ? 'border-l-4' : 'border'}`}
                            >
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            {getNotificationIcon(notification.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <div>
                                                    <h3 className="font-semibold flex items-center gap-2">
                                                        {notification.title}
                                                        {!notification.read && (
                                                            <span className="h-2 w-2 rounded-full bg-primary" />
                                                        )}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {notification.message}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    {!notification.read && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="flex-shrink-0"
                                                        >
                                                            <Check className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => deleteNotification(notification.id)}
                                                        className="flex-shrink-0 text-muted-foreground hover:text-red-400"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-card rounded-xl border border-border p-12 text-center">
                            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">No notifications</h3>
                            <p className="text-sm text-muted-foreground">
                                You're all caught up! No {filter === "unread" ? "unread" : filter === "read" ? "read" : ""} notifications to show.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
