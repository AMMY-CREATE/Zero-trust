import { Link } from "react-router-dom";
import { Activity, Brain, Bell, Eye, ArrowRight, ShieldAlert, Cpu, Network, Zap, Lock, Terminal, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Hero } from "@/components/Hero";
import { SmokeOverlay } from "@/components/effects/SmokeOverlay";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { DigitalRain } from "@/components/effects/DigitalRain";
import { useState, useEffect } from "react";
import "./LandingPage.css";

const features = [
    { icon: ShieldAlert, title: "Continuous Verification", description: "Verifies every access request regardless of origin", code: "ZERO_TRUST" },
    { icon: Brain, title: "Unsupervised Learning", description: "Isolation Forest & Autoencoders to detect unknown threats", code: "ML_ENGINE" },
    { icon: Activity, title: "Risk Scoring", description: "Dynamic risk assessment based on behavioral deviation", code: "RISK_SCORE" },
    { icon: Bell, title: "Real-Time Detection", description: "Identifies threats with <2.3s average latency", code: "RT_MONITOR" },
];

const stats = [
    { value: "92%", label: "Detection Accuracy", prefix: "ACCURACY" },
    { value: "2.3s", label: "Avg Latency", prefix: "SPEED" },
    { value: "10M+", label: "Events Analyzed", prefix: "DATA_SET" },
    { value: "24/7", label: "Continuous Monitor", prefix: "UPTIME" },
];

export default function LandingPage() {
    const [showHero, setShowHero] = useState(true);

    useEffect(() => {
        // Always show hero on landing page
        setShowHero(true);
    }, []);
    return (
        <PublicLayout>
            <SmokeOverlay />

            {showHero && <Hero />}
            <div className="main-wrapper">
                <DigitalRain />
                <div className="cyber-grid-overlay" />

                {/* Stats Section */}
                <section className="stats-section">
                    <div className="stats-container">
                        <div className="stats-grid">
                            {stats.map((stat, i) => (
                                <ScrollReveal key={i} delay={i * 100} variant="slide-up">
                                    <div className="stat-item group">
                                        <span className="stat-prefix">{stat.prefix}</span>
                                        <p className="stat-value">{stat.value}</p>
                                        <p className="stat-label">{stat.label}</p>
                                        <div className="stat-divider" />
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="features-section">
                    <div className="features-container">
                        <ScrollReveal variant="slide-up">
                            <div className="features-header">
                                <div className="features-badge">Section_02 // Features</div>
                                <h2 className="features-title">
                                    Comprehensive <span className="features-title-primary">Security</span>
                                </h2>
                                <div className="features-divider" />
                            </div>
                        </ScrollReveal>

                        <div className="features-grid">
                            {features.map((feature, i) => (
                                <ScrollReveal key={i} delay={i * 150} variant={i % 2 === 0 ? "slide-left" : "slide-right"}>
                                    <div className="feature-card group relative overflow-hidden">
                                        {/* Corner accents */}
                                        <div className="feature-card-top-right" />
                                        <div className="feature-card-bottom-left" />

                                        <div className="feature-header">
                                            <div className="feature-icon-wrapper">
                                                <feature.icon className="feature-icon" />
                                            </div>
                                            <span className="feature-code">{feature.code}</span>
                                        </div>

                                        <h3 className="feature-title">{feature.title}</h3>
                                        <p className="feature-description">
                                            {feature.description}
                                        </p>

                                        <div className="feature-arrow">
                                            <div className="arrow-divider" />
                                            <ArrowRight className="arrow-icon" />
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tactical System Status Section (New) */}
                <section id="architecture" className="system-section">
                    <div className="system-container-wrapper">
                        <ScrollReveal variant="slide-up">
                            <div className="system-container">
                                <div className="system-top-border" />
                                <div className="system-grid">
                                    <div className="system-content">
                                        <h3 className="system-title">System_Integrity_Monitor</h3>
                                        <p className="system-description">
                                            Our continuous monitoring engine analyzes 10M+ events daily, utilizing a zero-trust handshake protocol for every interaction.
                                        </p>
                                        <div className="system-nodes">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="node-item">
                                                    <div className="node-dot" />
                                                    <div className="node-bar">
                                                        <div className="node-bar-fill" style={{ width: `${40 + i * 15}%` }} />
                                                    </div>
                                                    <span className="node-label">NODE_0{i}_ACTIVE</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="system-button-wrapper">
                                        <Link to="/login" className="system-button-group">
                                            <div className="system-button-glow" />
                                            <Button size="lg" variant="outline" className="system-button">
                                                Access System Terminal
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <div className="cta-container">
                        <ScrollReveal variant="scale">
                            <div className="cta-content">
                                <Shield className="cta-shield-top" />
                                <h2 className="cta-title">
                                    Initiate <span className="cta-title-primary">Protection</span>
                                </h2>
                                <Shield className="cta-shield-bottom" />
                            </div>
                            <p className="cta-version">Deployment_Ready_v2.0.4</p>
                            <Link to="/login">
                                <Button size="lg" className="cta-button group">
                                    Deploy Now <Zap className="cta-button-icon cta-button-icon-bounce" />
                                </Button>
                            </Link>
                        </ScrollReveal>
                    </div>
                    <div className="cta-blur" />
                </section>
            </div>
        </PublicLayout>
    );
}
