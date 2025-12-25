// Mock data for ZTADS dashboard

export interface UserActivity {
  id: string;
  userId: string;
  userName: string;
  loginTime: string;
  device: string;
  location: string;
  ipAddress: string;
  riskLevel: 'low' | 'medium' | 'high';
  riskScore: number;
  status: 'normal' | 'suspicious' | 'blocked';
}

export interface Anomaly {
  id: string;
  userId: string;
  userName: string;
  type: string;
  description: string;
  timestamp: string;
  anomalyScore: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'investigating' | 'resolved' | 'false_positive';
  features: Record<string, number>;
}

export interface Alert {
  id: string;
  type: 'anomaly' | 'threat' | 'system' | 'policy';
  title: string;
  description: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical';
  status: 'new' | 'acknowledged' | 'resolved';
  userId?: string;
}

export interface RiskProfile {
  userId: string;
  userName: string;
  email: string;
  department: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  lastActivity: string;
  accessDecision: 'allowed' | 're-auth' | 'blocked';
  anomalyCount: number;
  behaviorScore: number;
}

// Generate mock user activities
export const generateUserActivities = (count: number = 50): UserActivity[] => {
  const devices = ['Windows 11 - Chrome', 'MacOS - Safari', 'Linux - Firefox', 'iOS - Mobile App', 'Android - Mobile App'];
  const locations = ['New York, USA', 'London, UK', 'Tokyo, Japan', 'Sydney, Australia', 'Berlin, Germany', 'Paris, France', 'Toronto, Canada'];
  const names = ['John Smith', 'Sarah Johnson', 'Michael Chen', 'Emily Davis', 'David Wilson', 'Jessica Brown', 'Robert Taylor', 'Amanda Miller', 'Christopher Lee', 'Jennifer Garcia'];
  
  return Array.from({ length: count }, (_, i) => {
    const riskScore = Math.floor(Math.random() * 100);
    const riskLevel: 'low' | 'medium' | 'high' = riskScore < 40 ? 'low' : riskScore < 70 ? 'medium' : 'high';
    const status: 'normal' | 'suspicious' | 'blocked' = riskScore < 50 ? 'normal' : riskScore < 80 ? 'suspicious' : 'blocked';
    
    return {
      id: `ACT-${1000 + i}`,
      userId: `USR-${100 + (i % 10)}`,
      userName: names[i % names.length],
      loginTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      device: devices[Math.floor(Math.random() * devices.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      ipAddress: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      riskLevel,
      riskScore,
      status,
    };
  }).sort((a, b) => new Date(b.loginTime).getTime() - new Date(a.loginTime).getTime());
};

// Generate mock anomalies
export const generateAnomalies = (count: number = 20): Anomaly[] => {
  const types = [
    'Unusual Login Time',
    'Geographic Impossibility',
    'Multiple Failed Attempts',
    'Unusual Data Access',
    'Privilege Escalation Attempt',
    'Unusual Network Activity',
    'Device Fingerprint Mismatch',
    'Session Hijacking Attempt',
  ];
  
  const descriptions: Record<string, string> = {
    'Unusual Login Time': 'Login attempt detected outside normal working hours',
    'Geographic Impossibility': 'Login from location inconsistent with previous activity',
    'Multiple Failed Attempts': 'Multiple failed authentication attempts detected',
    'Unusual Data Access': 'Access to sensitive data outside normal patterns',
    'Privilege Escalation Attempt': 'Attempt to access resources beyond user permissions',
    'Unusual Network Activity': 'Abnormal network traffic patterns detected',
    'Device Fingerprint Mismatch': 'Login from unrecognized device',
    'Session Hijacking Attempt': 'Potential session token compromise detected',
  };
  
  const names = ['John Smith', 'Sarah Johnson', 'Michael Chen', 'Emily Davis', 'David Wilson'];
  const statuses: Array<'new' | 'investigating' | 'resolved' | 'false_positive'> = ['new', 'investigating', 'resolved', 'false_positive'];
  
  return Array.from({ length: count }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const anomalyScore = 0.5 + Math.random() * 0.5;
    const severity: 'low' | 'medium' | 'high' | 'critical' = 
      anomalyScore < 0.6 ? 'low' : 
      anomalyScore < 0.75 ? 'medium' : 
      anomalyScore < 0.9 ? 'high' : 'critical';
    
    return {
      id: `ANM-${2000 + i}`,
      userId: `USR-${100 + (i % 5)}`,
      userName: names[i % names.length],
      type,
      description: descriptions[type],
      timestamp: new Date(Date.now() - Math.random() * 48 * 60 * 60 * 1000).toISOString(),
      anomalyScore,
      severity,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      features: {
        login_hour: Math.random(),
        failed_attempts: Math.random(),
        location_distance: Math.random(),
        device_trust: Math.random(),
        session_duration: Math.random(),
      },
    };
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Generate mock alerts
export const generateAlerts = (count: number = 30): Alert[] => {
  const alertTypes: Array<{ type: Alert['type']; titles: string[] }> = [
    { type: 'anomaly', titles: ['Anomaly Detected', 'Suspicious Behavior Alert', 'Unusual Activity Pattern'] },
    { type: 'threat', titles: ['Insider Threat Warning', 'Potential Data Breach', 'Unauthorized Access Attempt'] },
    { type: 'system', titles: ['System Health Warning', 'ML Model Updated', 'Database Backup Complete'] },
    { type: 'policy', titles: ['Policy Violation', 'Access Rule Triggered', 'Compliance Alert'] },
  ];
  
  const severities: Array<'info' | 'warning' | 'critical'> = ['info', 'warning', 'critical'];
  const statuses: Array<'new' | 'acknowledged' | 'resolved'> = ['new', 'acknowledged', 'resolved'];
  
  return Array.from({ length: count }, (_, i) => {
    const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    
    return {
      id: `ALR-${3000 + i}`,
      type: alertType.type,
      title: alertType.titles[Math.floor(Math.random() * alertType.titles.length)],
      description: `Alert triggered for security event requiring attention`,
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      severity: severities[Math.floor(Math.random() * severities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      userId: Math.random() > 0.3 ? `USR-${100 + Math.floor(Math.random() * 10)}` : undefined,
    };
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Generate mock risk profiles
export const generateRiskProfiles = (count: number = 10): RiskProfile[] => {
  const names = ['John Smith', 'Sarah Johnson', 'Michael Chen', 'Emily Davis', 'David Wilson', 'Jessica Brown', 'Robert Taylor', 'Amanda Miller', 'Christopher Lee', 'Jennifer Garcia'];
  const departments = ['Engineering', 'Finance', 'HR', 'Sales', 'Marketing', 'Operations', 'IT', 'Legal'];
  
  return Array.from({ length: count }, (_, i) => {
    const riskScore = Math.floor(Math.random() * 100);
    const riskLevel: 'low' | 'medium' | 'high' = riskScore < 40 ? 'low' : riskScore < 70 ? 'medium' : 'high';
    const accessDecision: 'allowed' | 're-auth' | 'blocked' = riskLevel === 'low' ? 'allowed' : riskLevel === 'medium' ? 're-auth' : 'blocked';
    
    return {
      userId: `USR-${100 + i}`,
      userName: names[i % names.length],
      email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@company.com`,
      department: departments[Math.floor(Math.random() * departments.length)],
      riskScore,
      riskLevel,
      lastActivity: new Date(Date.now() - Math.random() * 2 * 60 * 60 * 1000).toISOString(),
      accessDecision,
      anomalyCount: Math.floor(Math.random() * 10),
      behaviorScore: 50 + Math.floor(Math.random() * 50),
    };
  });
};

// Dashboard statistics
export const getDashboardStats = () => ({
  activeUsers: 142,
  anomaliesDetected: 23,
  highRiskUsers: 8,
  alertsToday: 15,
  systemHealth: 94,
  threatsBlocked: 156,
  avgRiskScore: 32,
  totalSessions: 1247,
});

// Chart data for activity trends
export const getActivityTrendData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => ({
    name: day,
    logins: Math.floor(50 + Math.random() * 100),
    anomalies: Math.floor(Math.random() * 15),
    blocked: Math.floor(Math.random() * 5),
  }));
};

// Chart data for anomaly distribution
export const getAnomalyDistributionData = () => [
  { name: 'Unusual Login Time', value: 35, color: 'hsl(var(--chart-1))' },
  { name: 'Geographic Issues', value: 25, color: 'hsl(var(--chart-2))' },
  { name: 'Failed Attempts', value: 20, color: 'hsl(var(--chart-3))' },
  { name: 'Data Access', value: 12, color: 'hsl(var(--chart-4))' },
  { name: 'Other', value: 8, color: 'hsl(var(--chart-5))' },
];

// Chart data for risk distribution
export const getRiskDistributionData = () => [
  { name: 'Low Risk', value: 65, color: 'hsl(var(--success))' },
  { name: 'Medium Risk', value: 25, color: 'hsl(var(--warning))' },
  { name: 'High Risk', value: 10, color: 'hsl(var(--danger))' },
];

// User dashboard data
export const getUserSecurityData = (userId: string) => ({
  securityScore: 85,
  lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  loginHistory: Array.from({ length: 10 }, (_, i) => ({
    id: `LOGIN-${i}`,
    timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    device: ['Chrome on Windows', 'Safari on MacOS', 'Mobile App'][Math.floor(Math.random() * 3)],
    location: ['New York, USA', 'London, UK', 'Home Network'][Math.floor(Math.random() * 3)],
    status: Math.random() > 0.1 ? 'success' : 'suspicious',
  })),
  devices: [
    { id: 'DEV-1', name: 'MacBook Pro', type: 'laptop', lastUsed: 'Just now', trusted: true },
    { id: 'DEV-2', name: 'iPhone 15', type: 'mobile', lastUsed: '2 hours ago', trusted: true },
    { id: 'DEV-3', name: 'Windows Desktop', type: 'desktop', lastUsed: '5 days ago', trusted: true },
  ],
  notifications: [
    { id: 'NOT-1', type: 'info', message: 'Your security score has improved', timestamp: new Date().toISOString() },
    { id: 'NOT-2', type: 'warning', message: 'New device login detected', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
    { id: 'NOT-3', type: 'success', message: 'Password updated successfully', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
  ],
});
