import { Shield, Lock, Zap, Brain, Eye, Network, Cpu, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { DigitalRain } from "@/components/effects/DigitalRain";
import { Link } from "react-router-dom";
import Switch from "@/components/Switch";
import Checkbox from "@/components/Checkbox";
import "./FeaturesPage.css";

const mainFeatures = [
    {
        icon: Shield,
        title: "Zero Trust Verification",
        description: "Eliminates implicit trust. Verifies every user, device, and service attempting to access network resources.",
        details: ["Continuous Verification", "Identity Validation", "Device Posture Check", "Least Privilege Access"]
    },
    {
        icon: Brain,
        title: "Unsupervised Anomaly Detection",
        description: "Utilizes Isolation Forest and Autoencoders to detect known and unknown threats without signatures.",
        details: ["Isolation Forest (Outliers)", "Autoencoders (Pattern Recognition)", "Ensemble Learning", "92% Accuracy"]
    },
    {
        icon: Zap,
        title: "Instant Threat Response",
        description: "Automated response mechanisms activate within milliseconds of threat detection to minimize breach exposure.",
        details: ["Auto-isolation protocols", "Session termination", "Policy enforcement", "Alert aggregation"]
    },
    {
        icon: Eye,
        title: "Complete Visibility",
        description: "Monitor every user action, system event, and network packet with deep packet inspection and behavioral tracking.",
        details: ["Real-time event logging", "Activity tracking", "Network intelligence", "Compliance reporting"]
    },
];

const securityFeatures = [
    {
        category: "Authentication",
        items: ["MFA Support", "Passwordless Auth", "Biometric Integration", "Legacy System Support"]
    },
    {
        category: "Detection",
        items: ["ML Anomalies", "Signature Detection", "Behavioral Analysis", "Threat Intelligence"]
    },
    {
        category: "Response",
        items: ["Auto Quarantine", "Policy Enforcement", "Alert System", "Incident Logs"]
    },
    {
        category: "Integration",
        items: ["SIEM Compatible", "SOAR Ready", "API First", "Cloud Native"]
    },
];

const performanceMetrics = [
    { metric: "Detection Latency", value: "2.3s", code: "AVG_LATENCY" },
    { metric: "IsoForest Accuracy", value: "87%", code: "MODEL_V1" },
    { metric: "Autoencoder Accuracy", value: "89%", code: "MODEL_V2" },
    { metric: "Throughput", value: "1M+ RPS", code: "SCALABILITY" },
];

export default function FeaturesPage() {
    return (
        <PublicLayout>
            <div className="features-main">
                <DigitalRain />
                <div className="cyber-grid-overlay" />

                {/* Header */}
                <section className="features-header">
                    <div className="features-container">
                        <ScrollReveal delay={0} variant="fade-in">
                            <div className="features-badge">
                                <CheckCircle className="features-badge-icon" />
                                <span>ADVANCED_CAPABILITIES</span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={100} variant="slide-up">
                            <h1 className="features-title">
                                Comprehensive Security
                                <span className="features-title-accent"> Features</span>
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal delay={200} variant="fade-in">
                            <p className="features-subtitle">
                                Powerful security controls designed to protect against the evolving threat landscape.
                            </p>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Main Features */}
                <section className="features-main-section">
                    <div className="features-container">
                        {mainFeatures.map((feature, i) => (
                            <ScrollReveal key={i} delay={i * 100} variant="slide-up">
                                <div className="feature-card-large">
                                    <div className="feature-card-content">
                                        <div className="feature-front">
                                            <div className="feature-icon-box">
                                                <feature.icon className="feature-icon-large" />
                                            </div>
                                            <div className="feature-content">
                                                <h3 className="feature-title-large">{feature.title}</h3>
                                                <p className="feature-description-large">{feature.description}</p>
                                                <ul className="feature-details">
                                                    {feature.details.map((detail, j) => (
                                                        <li key={j}>
                                                            <span className="detail-dot" />
                                                            {detail}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="feature-back">
                                            <div className="feature-back-content">
                                                <h3 className="feature-title-large">{feature.title}</h3>
                                                <p className="feature-description-large">{feature.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>

                {/* Security Features Grid */}
                <section className="features-grid-section">
                    <div className="features-container">
                        <ScrollReveal delay={0} variant="slide-up">
                            <h2 className="features-section-title">Security Capabilities</h2>
                        </ScrollReveal>

                        <div className="security-features-grid">
                            {securityFeatures.map((group, i) => (
                                <ScrollReveal key={i} delay={i * 100} variant="slide-up">
                                    <div className="security-feature-group">
                                        <h3 className="group-title">{group.category}</h3>
                                        <div className="group-items">
                                            {group.items.map((item, j) => (
                                                <div key={j} className="group-item">
                                                    <CheckCircle className="item-check" />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* System Control Demo */}
                <section className="features-system-control">
                    <div className="features-container">
                        <ScrollReveal delay={0} variant="slide-up">
                            <h2 className="features-section-title">System Status</h2>
                        </ScrollReveal>
                        <div className="system-status-grid" style={{ display: 'flex', gap: '4rem', justifyContent: 'center', alignItems: 'center', padding: '4rem', background: 'rgba(0,0,0,0.5)', borderRadius: '1rem', border: '1px solid rgba(0,255,150,0.1)' }}>
                            <div className="system-control-demo">
                                <h3 className="text-xl font-mono text-primary mb-8 text-center">MANUAL OVERRIDE</h3>
                                <Switch />
                            </div>
                            <div className="system-control-demo">
                                <h3 className="text-xl font-mono text-primary mb-8 text-center">QUANTUM SYNC</h3>
                                <Checkbox
                                    id="feature-demo-checkbox"
                                    checked={true}
                                    scale={0.8}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Performance Metrics */}
                <section className="features-performance">
                    <div className="features-container">
                        <ScrollReveal delay={0} variant="slide-up">
                            <h2 className="features-section-title">Performance Metrics</h2>
                        </ScrollReveal>

                        <div className="performance-grid">
                            {performanceMetrics.map((item, i) => (
                                <ScrollReveal key={i} delay={i * 100} variant="slide-up">
                                    <div className="performance-card">
                                        <div className="metric-value">{item.value}</div>
                                        <div className="metric-label">{item.metric}</div>
                                        <div className="metric-code">{item.code}</div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="features-cta">
                    <div className="features-container">
                        <ScrollReveal delay={0} variant="slide-up">
                            <div className="cta-box">
                                <h2 className="cta-title">ZTADS Implementation</h2>
                                <p className="cta-description">
                                    Project by Himanshu Pandey, guided by Mr. Siddharth Meshram (CSVTU).
                                </p>
                                <div className="cta-buttons">
                                    <Link to="/admin">
                                        <Button size="xl" className="cta-button">
                                            Deploy Now
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
