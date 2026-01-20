import { Database, Cloud, Layers, Server, Shield, Lock, Network, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { DigitalRain } from "@/components/effects/DigitalRain";
import { Link } from "react-router-dom";
import "./ArchitecturePage.css";

const architectureLayers = [
    {
        name: "Presentation Layer",
        icon: Layers,
        description: "Web UI, Mobile Apps, API Portals",
        components: ["React Frontend", "Mobile SDK", "Admin Console", "API Gateway"]
    },
    {
        name: "Authentication Layer",
        icon: Shield,
        description: "Identity verification and session management",
        components: ["MFA Service", "Biometric Engine", "Session Manager", "Token Service"]
    },
    {
        name: "Detection Layer",
        icon: Zap,
        description: "Zero-Trust Engine & ML Models",
        components: ["Isolation Forest", "Autoencoders", "Risk Scoring", "Alert Generation"]
    },
    {
        name: "Data Layer",
        icon: Database,
        description: "Secure storage for training & events",
        components: ["PostgreSQL (Logs)", "MongoDB (Traffic)", "Training Datasets", "Feature Store"]
    },
];

const infrastructureComponents = [
    {
        title: "Kubernetes Orchestration",
        description: "Containerized deployment across multi-region clusters",
        icon: Cloud
    },
    {
        title: "Distributed Processing",
        description: "Apache Kafka for real-time event streaming",
        icon: Network
    },
    {
        title: "Data Pipeline",
        description: "Apache Spark for large-scale data analysis",
        icon: Server
    },
    {
        title: "Secure Communication",
        description: "End-to-end encryption with mTLS",
        icon: Lock
    },
];

const deploymentOptions = [
    {
        name: "Cloud Native",
        provider: "AWS, GCP, Azure",
        details: ["Fully managed", "Auto-scaling", "Regional redundancy"]
    },
    {
        name: "Hybrid",
        provider: "On-Premise + Cloud",
        details: ["Flexibility", "Data residency", "Gradual migration"]
    },
    {
        name: "On-Premise",
        provider: "Private datacenter",
        details: ["Complete control", "Air-gapped options", "Hardware optimized"]
    },
];

export default function ArchitecturePage() {
    return (
        <PublicLayout>
            <div className="architecture-main">
                <DigitalRain />
                <div className="cyber-grid-overlay" />

                {/* Header */}
                <section className="architecture-header">
                    <div className="architecture-container">
                        <ScrollReveal delay={0} variant="fade-in">
                            <div className="architecture-badge">
                                <Layers className="architecture-badge-icon" />
                                <span>SYSTEM_ARCHITECTURE</span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={100} variant="slide-up">
                            <h1 className="architecture-title">
                                Enterprise-Grade
                                <span className="architecture-title-accent"> Architecture</span>
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal delay={200} variant="fade-in">
                            <p className="architecture-subtitle">
                                A multi-layered architecture integrating data collection, machine learning analysis, and real-time visualization.
                            </p>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Architecture Layers */}
                <section className="architecture-layers-section">
                    <div className="architecture-container">
                        <ScrollReveal delay={0} variant="slide-up">
                            <h2 className="architecture-section-title">System Layers</h2>
                        </ScrollReveal>

                        <div className="layers-stack">
                            {architectureLayers.map((layer, i) => (
                                <ScrollReveal key={i} delay={i * 100} variant="slide-up">
                                    <div className="layer-card">
                                        <div className="layer-header">
                                            <layer.icon className="layer-icon" />
                                            <h3 className="layer-name">{layer.name}</h3>
                                        </div>
                                        <p className="layer-description">{layer.description}</p>
                                        <div className="layer-components">
                                            {layer.components.map((comp, j) => (
                                                <span key={j} className="component-badge">{comp}</span>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                        <div className="layers-divider" />
                    </div>
                </section>

                {/* Infrastructure Components */}
                <section className="architecture-infrastructure">
                    <div className="architecture-container">
                        <ScrollReveal delay={0} variant="slide-up">
                            <h2 className="architecture-section-title">Core Infrastructure</h2>
                        </ScrollReveal>

                        <div className="infrastructure-grid">
                            {infrastructureComponents.map((component, i) => (
                                <ScrollReveal key={i} delay={i * 100} variant="slide-up">
                                    <div className="infrastructure-card group">
                                        <component.icon className="infrastructure-icon" />
                                        <h3 className="infrastructure-title">{component.title}</h3>
                                        <p className="infrastructure-description">{component.description}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Deployment Options */}
                <section className="architecture-deployment">
                    <div className="architecture-container">
                        <ScrollReveal delay={0} variant="slide-up">
                            <h2 className="architecture-section-title">Deployment Options</h2>
                        </ScrollReveal>

                        <div className="deployment-grid">
                            {deploymentOptions.map((option, i) => (
                                <ScrollReveal key={i} delay={i * 100} variant="slide-up">
                                    <div className="deployment-card">
                                        <h3 className="deployment-name">{option.name}</h3>
                                        <p className="deployment-provider">{option.provider}</p>
                                        <ul className="deployment-details">
                                            {option.details.map((detail, j) => (
                                                <li key={j}>
                                                    <span className="detail-marker" />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* High Availability */}
                <section className="architecture-ha">
                    <div className="architecture-container">
                        <ScrollReveal delay={0} variant="slide-up">
                            <h2 className="architecture-section-title">High Availability Features</h2>
                        </ScrollReveal>

                        <ScrollReveal delay={100} variant="fade-in">
                            <div className="ha-grid">
                                <div className="ha-item">
                                    <div className="ha-number">3</div>
                                    <div className="ha-text">Region Minimum Deployment</div>
                                </div>
                                <div className="ha-item">
                                    <div className="ha-number">99.99%</div>
                                    <div className="ha-text">Uptime SLA</div>
                                </div>
                                <div className="ha-item">
                                    <div className="ha-number">Auto</div>
                                    <div className="ha-text">Failover Enabled</div>
                                </div>
                                <div className="ha-item">
                                    <div className="ha-number">Sub-ms</div>
                                    <div className="ha-text">Replication Lag</div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* CTA */}
                <section className="architecture-cta">
                    <div className="architecture-container">
                        <ScrollReveal delay={0} variant="slide-up">
                            <div className="cta-box">
                                <h2 className="cta-title">Ready to Deploy?</h2>
                                <p className="cta-description">
                                    Contact our team to discuss your deployment requirements.
                                </p>
                                <div className="cta-buttons">
                                    <Link to="/admin">
                                        <Button size="xl" className="cta-button">
                                            View Dashboard
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
