
export const generateUserActivities = (countCount = 50) => {
    const devices = ['Windows 11 - Chrome', 'Ubuntu 20.04 LTS - Firefox', 'MacOS - Safari', 'Android - ZTADS App'];
    const locations = ['Bhilai, India', 'Raipur, India', 'New Delhi, India', 'Mumbai, India', 'New York, USA', 'London, UK', 'Moscow, Russia'];
    const names = [
        'Himanshu Pandey', // The Student
        'Siddharth Meshram', // The Guide
        'Pankaj Mishra', // Faculty
        'Rahul Sharma',
        'Priya Patel',
        'Amit Kumar',
        'Sneha Gupta',
        'Vikram Singh'
    ];

    return Array.from({ length: countCount }, (_, i) => {
        const riskScore = Math.floor(Math.random() * 100);
        const riskLevel = riskScore < 40 ? 'low' : riskScore < 70 ? 'medium' : 'high';
        // Zero-Trust Concept: Verify every access
        const status = riskScore < 50 ? 'verified' : riskScore < 80 ? 'verification_pending' : 'blocked';

        return {
            id: `ACT-${1000 + i}`,
            userId: `USR-${100 + (i % names.length)}`,
            userName: names[i % names.length],
            loginTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            device: devices[Math.floor(Math.random() * devices.length)],
            location: locations[Math.floor(Math.random() * locations.length)],
            ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`, // Internal mostly, but some external for testing
            riskLevel,
            riskScore,
            status,
        };
    }).sort((a, b) => new Date(b.loginTime).getTime() - new Date(a.loginTime).getTime());
};


export const generateAnomalies = (countCount = 20) => {
    // Anomalies derived from Chapter 5.1 & 1.4
    const types = [
        'Unusual Network Traffic',
        'Potential Data Exfiltration',
        'Suspicious Access Attempt',
        'Abnormal User Behavior',
        'Unknown Threat (Zero-Day)',
        'Privilege Escalation',
        'Device Fingerprint Mismatch'
    ];

    const modelMappedInfo = {
        'Unusual Network Traffic': { description: 'Outlier detected in packet timing/size', model: 'Isolation Forest' },
        'Potential Data Exfiltration': { description: 'High volume outbound traffic detected', model: 'Autoencoder' },
        'Suspicious Access Attempt': { description: 'Access from implicit trust zone denied', model: 'Zero-Trust Policy' },
        'Abnormal User Behavior': { description: 'Deviation from established behavioral baseline', model: 'Autoencoder (LSTM)' },
        'Unknown Threat (Zero-Day)': { description: 'Pattern does not match known signatures', model: 'Unsupervised Learning' },
        'Privilege Escalation': { description: 'Unauthorized attempt to access Admin resources', model: 'Behavioral Analysis' },
        'Device Fingerprint Mismatch': { description: 'Device integrity check failed', model: 'Device Posture Check' }
    };

    const names = ['Himanshu Pandey', 'Siddharth Meshram', 'System Admin', 'Guest User', 'Service Account'];
    const statuses = ['new', 'analyzing', 'resolved', 'false_positive'];

    return Array.from({ length: countCount }, (_, i) => {
        const type = types[Math.floor(Math.random() * types.length)];
        const info = modelMappedInfo[type];
        const anomalyScore = 0.65 + Math.random() * 0.35; // Tend towards higher scores for anomalies

        // From Report: Avg Latency 2.3s, so simulation timestamps might reflect recent processing

        const severity =
            anomalyScore < 0.75 ? 'low' :
                anomalyScore < 0.85 ? 'medium' :
                    anomalyScore < 0.95 ? 'high' : 'critical';

        return {
            id: `ANM-${2000 + i}`,
            userId: `USR-${100 + (i % 5)}`,
            userName: names[i % names.length],
            type,
            description: info.description,
            detectionModel: info.model, // Added field
            timestamp: new Date(Date.now() - Math.random() * 48 * 60 * 60 * 1000).toISOString(),
            anomalyScore,
            severity,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            features: {
                reconstruction_error: Math.random(), // For Autoencoder
                isolation_path_length: Math.random(), // For Isolation Forest
                packet_size_variance: Math.random(),
                login_frequency: Math.random(),
                geo_velocity: Math.random(),
            },
        };
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};


export const generateAlerts = (countCount = 30) => {
    const alertTypes = [
        { type: 'anomaly', titles: ['High Reconstruction Error', 'Isolation Forest Outlier', 'Behavioral Deviation'] },
        { type: 'threat', titles: ['Potential APT Detected', 'Data Exfiltration Warning', 'Unauthorized Lateral Movement'] },
        { type: 'system', titles: ['Model Retraining Complete', 'High Inference Latency', 'Database Backup (PostgreSQL)'] },
        { type: 'policy', titles: ['Zero-Trust Verification Failed', 'BYOD Policy Violation', 'Compliance Audit Logged'] },
    ];

    const severities = ['info', 'warning', 'critical'];
    const statuses = ['new', 'acknowledged', 'resolved'];

    return Array.from({ length: countCount }, (_, i) => {
        const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];

        return {
            id: `ALR-${3000 + i}`,
            type: alertType.type,
            title: alertType.titles[Math.floor(Math.random() * alertType.titles.length)],
            description: `ZTADS Detection Engine flagged this event. Risk Score: ${Math.floor(Math.random() * 100)}`,
            timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
            severity: severities[Math.floor(Math.random() * severities.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            userId: Math.random() > 0.3 ? `USR-${100 + Math.floor(Math.random() * 5)}` : undefined,
        };
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};


export const generateRiskProfiles = (countCount = 10) => {
    const names = [
        'Himanshu Pandey',
        'Siddharth Meshram',
        'Rahul Sharma',
        'Priya Patel',
        'Amit Kumar',
        'Sneha Gupta',
        'Vikram Singh',
        'Anjali Desai'
    ];
    const departments = ['CSE Dept', 'Data Science', 'Administration', 'Faculty', 'IT Support'];

    return Array.from({ length: countCount }, (_, i) => {
        const riskScore = Math.floor(Math.random() * 100);
        const riskLevel = riskScore < 40 ? 'low' : riskScore < 70 ? 'medium' : 'high';
        // ZTADS Response
        const accessDecision = riskLevel === 'low' ? 'allowed' : riskLevel === 'medium' ? 'step_up_auth' : 'quarantined';

        return {
            userId: `USR-${100 + i}`,
            userName: names[i % names.length],
            email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@csytu.ac.in`, // University domain
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


export const getDashboardStats = () => ({
    activeUsers: 450, // University scale
    anomaliesDetected: 42,
    highRiskUsers: 12,
    alertsToday: 28,
    systemHealth: 98, // "High processing performance"
    threatsBlocked: 145, // "Prevention of costly data breaches"
    modelAccuracy: '92%', // From Report (Ensemble)
    avgLatency: '2.3s', // From Report
});


export const getActivityTrendData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
        name: day,
        normal_traffic: Math.floor(500 + Math.random() * 200),
        anomalies: Math.floor(Math.random() * 20), // Low % of total traffic
        blocked_threats: Math.floor(Math.random() * 10),
    }));
};


export const getAnomalyDistributionData = () => [
    { name: 'Network Anomalies (Isolation Forest)', value: 45, color: 'hsl(var(--chart-1))' },
    { name: 'Behavioral Deviation (Autoencoder)', value: 30, color: 'hsl(var(--chart-2))' },
    { name: 'Access Violations', value: 15, color: 'hsl(var(--chart-3))' },
    { name: 'Data Exfiltration', value: 10, color: 'hsl(var(--chart-4))' },
];


export const getRiskDistributionData = () => [
    { name: 'Low Risk (Trusted)', value: 70, color: 'hsl(var(--success))' },
    { name: 'Medium Risk (Monitor)', value: 20, color: 'hsl(var(--warning))' },
    { name: 'High Risk (Blocked)', value: 10, color: 'hsl(var(--danger))' },
];


export const getUserSecurityData = (userId) => ({
    securityScore: 88,
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    loginHistory: Array.from({ length: 10 }, (_, i) => ({
        id: `LOGIN-${i}`,
        timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
        device: ['Chrome on Windows 11', 'Firefox on Ubuntu', 'Safari on MacOS'][Math.floor(Math.random() * 3)],
        location: ['Bhilai, India', 'Raipur, India', 'Remote VPN'][Math.floor(Math.random() * 3)],
        status: Math.random() > 0.1 ? 'verified' : 'flagged',
    })),
    devices: [
        { id: 'DEV-1', name: 'Workstation (Ubuntu)', type: 'desktop', lastUsed: 'Just now', trusted: true },
        { id: 'DEV-2', name: 'Himanshu Phone', type: 'mobile', lastUsed: '2 hours ago', trusted: true },
    ],
    notifications: [
        { id: 'NOT-1', type: 'info', message: 'Baseline behavior model updated', timestamp: new Date().toISOString() },
        { id: 'NOT-2', type: 'warning', message: 'Unusual login time detected (Flagged)', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
    ],
});
