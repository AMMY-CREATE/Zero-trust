import { Shield, Lock, Zap, Brain, Eye, Network, Cpu, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { DigitalRain } from "@/components/effects/DigitalRain";
import { Link } from "react-router-dom";
import "./FeaturesPage.css";

const mainFeatures = [
    {
        icon: Shield,
        title: "Zero Trust Verification",
        description: "Every access request is verified regardless of origin or trust level. Implements continuous authentication throughout user sessions.",
        details: ["Multi-factor authentication", "Behavioral biometrics", "Device posture checking", "Context-aware policies"]
    },
    {
        icon: Brain,
        title: "AI-Powered Anomaly Detection",
        description: "Machine learning models trained on billions of security events detect suspicious patterns in real-time.",
        details: ["Neural networks for pattern recognition", "Behavioral baseline learning", "Threat correlation analysis", "Adaptive threat scoring"]
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
    { metric: "Detection Latency", value: "<50ms", code: "LATENCY_OPTIMAL" },
    { metric: "API Response", value: "<100ms", code: "API_PERF" },
    { metric: "Uptime SLA", value: "99.99%", code: "AVAILABILITY" },
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
                                <h2 className="cta-title">Start Protecting Your Infrastructure</h2>
                                <p className="cta-description">
                                    Deploy Ammy Project and gain immediate visibility and control.
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
