import { Users, AlertTriangle, Activity, Bell, ShieldCheck, TrendingUp } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { AnomalyPieChart } from "@/components/dashboard/AnomalyPieChart";
import { RiskGauge } from "@/components/dashboard/RiskGauge";
import { getDashboardStats, generateAlerts } from "@/lib/mockData";
import { SeverityBadge } from "@/components/dashboard/SeverityBadge";
import { formatDistanceToNow } from "date-fns";

export default function AdminDashboard() {
  const stats = getDashboardStats();
  const recentAlerts = generateAlerts(5);

  return (
    <DashboardLayout userRole="admin" title="Dashboard Overview" subtitle="Real-time security monitoring">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Active Users" value={stats.activeUsers} change="+12 from yesterday" changeType="positive" icon={Users} />
        <StatCard title="Anomalies Detected" value={stats.anomaliesDetected} change="+5 new today" changeType="negative" icon={AlertTriangle} />
        <StatCard title="High Risk Users" value={stats.highRiskUsers} change="2 need attention" changeType="negative" icon={Activity} />
        <StatCard title="Alerts Today" value={stats.alertsToday} change="3 critical" changeType="neutral" icon={Bell} />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        <AnomalyPieChart />
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* System Health */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold mb-6">System Health</h3>
          <div className="flex justify-around">
            <RiskGauge score={stats.systemHealth} label="System Health" />
            <RiskGauge score={100 - stats.avgRiskScore} label="Security Score" />
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <SeverityBadge severity={alert.severity} />
                  <div>
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground capitalize">{alert.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
