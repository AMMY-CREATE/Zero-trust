import { Link, useLocation } from "react-router-dom";
import {
  Shield,
  LayoutDashboard,
  Users,
  AlertTriangle,
  Activity,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface DashboardSidebarProps {
  userRole: 'admin' | 'user';
}

const adminNavItems = [
  { label: "Overview", path: "/admin", icon: LayoutDashboard },
  { label: "User Activity", path: "/admin/activity", icon: Users },
  { label: "Anomaly Detection", path: "/admin/anomalies", icon: AlertTriangle },
  { label: "Risk Management", path: "/admin/risk", icon: Activity },
  { label: "Alerts", path: "/admin/alerts", icon: Bell },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

const userNavItems = [
  { label: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { label: "Login History", path: "/dashboard/history", icon: Activity },
  { label: "Devices", path: "/dashboard/devices", icon: Users },
  { label: "Notifications", path: "/dashboard/notifications", icon: Bell },
];

export function DashboardSidebar({ userRole }: DashboardSidebarProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const navItems = userRole === 'admin' ? adminNavItems : userNavItems;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <Shield className="h-8 w-8 text-primary" />
            <div className="absolute inset-0 bg-primary/20 blur-lg" />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg">
              <span className="text-primary">ZT</span>ADS
            </span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-primary")} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-3 border-t border-sidebar-border">
        <div className={cn("flex items-center gap-3 px-3 py-2", collapsed && "justify-center")}>
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-medium text-primary">
              {userRole === 'admin' ? 'A' : 'U'}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {userRole === 'admin' ? 'Admin User' : 'Regular User'}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {userRole}@ztads.com
              </p>
            </div>
          )}
        </div>
        <Link to="/login">
          <Button
            variant="ghost"
            className={cn(
              "w-full mt-2 text-muted-foreground hover:text-foreground",
              collapsed && "px-0"
            )}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Sign Out</span>}
          </Button>
        </Link>
      </div>
    </aside>
  );
}
