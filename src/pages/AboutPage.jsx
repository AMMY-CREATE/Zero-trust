import { Shield, Lock, Zap, Brain, Eye, Network, Cpu, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { DigitalRain } from "@/components/effects/DigitalRain";
import { Link } from "react-router-dom";
import "./AboutPage.css";

const missionPoints = [
    {
        icon: Shield,
        title: "Zero Trust Architecture",
        description: "Eliminating the concept of trusted internal networks. Always verify."
    },
    {
        icon: Brain,
        title: "Unsupervised Detection",
        description: "Identifying known and unknown threats using Isolation Forest and Autoencoders."
    },
    {
        icon: Eye,
        title: "Comprehensive Visibility",
        description: "Monitoring network traffic, access logs, and user behavior in real-time."
    },
    {
        icon: Zap,
        title: "Adaptive Security",
        description: "Intelligent protection that evolves with changing threat landscapes."
    },
];

const capabilities = [
    {
        icon: Lock,
        title: "Identity Verification",
        description: "Multi-factor authentication with behavioral biometrics",
        code: "AUTH_v2.0"
    },
    {
        icon: Network,
        title: "Network Intelligence",
        description: "Deep packet inspection and anomalous traffic detection",
        code: "NET_INTEL"
    },
    {
        icon: Brain,
        title: "Ensemble ML Models",
        description: "Combining multiple algorithms (IsoForest + Autoencoder) for 92% accuracy",
        code: "NEURAL_NET"
    },
    {
        icon: Cpu,
        title: "Adaptive Response",
        description: "Dynamic policy enforcement based on real-time risk assessment",
        code: "ADAPT_POLICY"
    },
];



export default function AboutPage() {
    return (
        <PublicLayout>
            <div className="about-main">
                <DigitalRain />
                <div className="cyber-grid-overlay" />

                {/* About Header */}
                <section className="about-header">
                    <div className="about-container">
                        <ScrollReveal delay={0} variant="fade-in">
                            <div className="about-badge">
                                <AlertTriangle className="about-badge-icon" />
                                <span>Zero-Trust Anomaly Detection System</span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={100} variant="slide-up">
                            <h1 className="about-title">
                                Securing Digital
                                <span className="about-title-accent"> Ecosystems</span>
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal delay={200} variant="fade-in">
                            <p className="about-subtitle">
                                An Independent Project Report submitted to Chhattisgarh Swami Vivekanand Technical University (CSVTU), Bhilai.
                                <br />
                                <strong>Department of Computer Science & Engineering</strong>
                            </p>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="about-mission">
                    <div className="about-container">
                        <ScrollReveal delay={0} variant="slide-up">
                            <h2 className="about-section-title">Our Mission</h2>
                        </ScrollReveal>

                        <div className="mission-grid">
                            {missionPoints.map((point, i) => (
                                <ScrollReveal key={i} delay={i * 100} variant="slide-up">
                                    <div className="mission-card">
                                        <div className="mission-icon-wrapper">
                                            <point.icon className="mission-icon" />
                                        </div>
                                        <h3 className="mission-title">{point.title}</h3>
                                        <p className="mission-description">{point.description}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Capabilities Section */}
                <section className="about-capabilities">
                    <div className="about-container">
                        <ScrollReveal delay={0} variant="slide-up">
                            <h2 className="about-section-title">Core Capabilities</h2>
                        </ScrollReveal>

                        <div className="capabilities-grid">
                            {capabilities.map((cap, i) => (
                                <ScrollReveal key={i} delay={i * 100} variant="slide-up">
                                    <div className="capability-card group">
                                        <div className="capability-header">
                                            <cap.icon className="capability-icon" />
                                            <span className="capability-code">{cap.code}</span>
                                        </div>
                                        <h3 className="capability-title">{cap.title}</h3>
                                        <p className="capability-description">{cap.description}</p>
                                        <div className="capability-divider" />
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="about-stats">
                    <div className="about-container">
                        <div className="stats-grid">
                            <ScrollReveal delay={0} variant="slide-up">
                                <div className="stat-block">
                                    <div className="stat-number">0</div>
                                    <div className="stat-text">Enterprise Clients</div>
                                    <div className="stat-code">CLIENTS_ACTIVE</div>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal delay={100} variant="slide-up">
                                <div className="stat-block">
                                    <div className="stat-number">25%</div>
                                    <div className="stat-text">Ensemble Accuracy</div>
                                    <div className="stat-code">DETECTION_RATE</div>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal delay={200} variant="slide-up">
                                <div className="stat-block">
                                    <div className="stat-number">2.3s</div>
                                    <div className="stat-text">Avg Latency</div>
                                    <div className="stat-code">REAL_TIME_PROC</div>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal delay={300} variant="slide-up">
                                <div className="stat-block">
                                    <div className="stat-number">0</div>
                                    <div className="stat-text">Events Processed</div>
                                    <div className="stat-code">DATA_VOLUME</div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </section>

                {/* Technology Stack */}
                <section className="about-tech">
                    <div className="about-container">
                        <ScrollReveal delay={0} variant="slide-up">
                            <h2 className="about-section-title">Technology Stack</h2>
                        </ScrollReveal>

                        <ScrollReveal delay={100} variant="fade-in">
                            <div className="tech-grid">
                                <div className="tech-item">
                                    <div className="tech-label">Backend</div>
                                    <div className="tech-value">Node.js, Python, Go</div>
                                </div>
                                <div className="tech-item">
                                    <div className="tech-label">ML/AI</div>
                                    <div className="tech-value">TensorFlow, PyTorch</div>
                                </div>
                                <div className="tech-item">
                                    <div className="tech-label">Database</div>
                                    <div className="tech-value">PostgreSQL, MongoDB</div>
                                </div>
                                <div className="tech-item">
                                    <div className="tech-label">Frontend</div>
                                    <div className="tech-value">React, Vue.js</div>
                                </div>
                                <div className="tech-item">
                                    <div className="tech-label">Infrastructure</div>
                                    <div className="tech-value">Kubernetes, AWS, GCP</div>
                                </div>
                                <div className="tech-item">
                                    <div className="tech-label">Security</div>
                                    <div className="tech-value">End-to-End Encryption</div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="about-cta">
                    <div className="about-container">
                        <ScrollReveal delay={0} variant="slide-up">
                            <div className="cta-box">
                                <h2 className="cta-title">Project Team</h2>
                                <p className="cta-description text-lg">
                                    <strong>Developed By:</strong> Himanshu Pandey (Roll: 300012824024)<br />
                                    <strong>Guided By:</strong> Mr. Siddharth Meshram (Asst. Professor)<br />
                                    <strong>Institution:</strong> UTD, CSVTU Bhilai
                                </p>
                                <div className="cta-buttons">
                                    <Link to="/admin">
                                        <Button size="xl" className="cta-button">
                                            View Dashboard
                                        </Button>
                                    </Link>
                                    <Link to="/login">
                                        <Button size="xl" variant="outline" className="cta-button-outline">
                                            Get Started
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
