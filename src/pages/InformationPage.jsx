
import React from 'react';
import {
    Info,
    BookOpen,
    Cpu,
    Shield,
    Terminal,
    Database,
    Code,
    Layers,
    GitBranch,
    Wrench,
    Activity,
    LogIn,
    Monitor,
    ShieldCheck,
    AlertTriangle,
    Search,
    Fingerprint,
    HardDrive,
    Timer,
    Zap,
    Globe
} from 'lucide-react';
import { PublicLayout } from "@/components/layout/PublicLayout";
import { DigitalRain } from "@/components/effects/DigitalRain";
import './InformationPage.css';

const InformationPage = () => {
    const steps = [
        {
            title: "Access the System",
            description: "Navigate to the Login page and enter your credentials. The system uses Zero-Trust architecture, so every session is analyzed for behavioral anomalies.",
            icon: <LogIn className="card-icon" />
        },
        {
            title: "Explore the Dashboard",
            description: "Once logged in, you'll see your security posture. Users can view their login history and trusted devices, while admins get access to global anomaly detection.",
            icon: <Monitor className="card-icon" />
        },
        {
            title: "Monitor in Real-Time",
            description: "Use the Live Threat Simulator to see how the ML engine reacts to different scenarios like Brute Force or Data Exfiltration.",
            icon: <Activity className="card-icon" />
        },
        {
            title: "Understand Risk Scores",
            description: "The ML engine assigns a risk score (0-100) to every session. If the score exceeds safety thresholds, the system can automatically trigger protective policies.",
            icon: <ShieldCheck className="card-icon" />
        }
    ];

    return (
        <PublicLayout>
            <div className="info-page">
                <DigitalRain />
                <div className="info-cyber-grid" />
                <div className="bg-glow-main" />
                <div className="bg-glow" />

                <div className="info-container">
                    <header className="info-header">
                        <h1 className="info-title">
                            <span>System</span> Information
                        </h1>
                        <p className="info-subtitle">
                            Discover the architecture, technology, and usage guidelines for the
                            Zero-Trust Behavioral Anomaly Detection System (ZTADS).
                        </p>
                    </header>

                    <section className="info-section">
                        <h2 className="section-title">
                            <Info className="w-8 h-8" />
                            Project Overview
                        </h2>
                        <div className="info-grid">
                            <div className="info-card">
                                <Shield className="card-icon" />
                                <h3 className="card-title">Zero-Trust Verified</h3>
                                <p className="card-content">
                                    ZTADS operates on the principle of "Never Trust, Always Verify."
                                    It continuously monitors user behavior rather than relying solely on
                                    perimeter defenses.
                                </p>
                            </div>
                            <div className="info-card">
                                <Cpu className="card-icon" />
                                <h3 className="card-title">ML-Driven Analysis</h3>
                                <p className="card-content">
                                    Utilizing Isolation Forest algorithms, the system detects deviations
                                    from "normal" behavioral patterns in real-time, providing instant
                                    risk assessment.
                                </p>
                            </div>
                            <div className="info-card">
                                <Terminal className="card-icon" />
                                <h3 className="card-title">Proactive Defense</h3>
                                <p className="card-content">
                                    Beyond simple detection, the project includes simulated threat environments
                                    to test and harden security policies against evolving attack vectors.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="info-section">
                        <h2 className="section-title">
                            <BookOpen className="w-8 h-8" />
                            User Guide
                        </h2>
                        <div className="guide-steps">
                            {steps.map((step, index) => (
                                <div key={index} className="step-card">
                                    <div className="step-number">0{index + 1}</div>
                                    <div className="step-content">
                                        <h3 className="step-title">{step.title}</h3>
                                        <p className="step-description">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="info-section">
                        <h2 className="section-title">
                            <Search className="w-8 h-8" />
                            Risk Detection Intelligence
                        </h2>
                        <div className="info-grid">
                            <div className="info-card">
                                <Timer className="card-icon" />
                                <h3 className="card-title">Temporal Anomalies</h3>
                                <p className="card-content">
                                    System analyzes login timestamps. Accessing sensitive data at 3 AM from a 9-to-5
                                    profile triggers immediate elevation of risk scores.
                                </p>
                            </div>
                            <div className="info-card">
                                <Zap className="card-icon" />
                                <h3 className="card-title">Velocity Analysis</h3>
                                <p className="card-content">
                                    Continuous monitoring of request frequency. A sudden spike from 20 to 500 requests
                                    per minute suggests automated bot activity or scraping.
                                </p>
                            </div>
                            <div className="info-card">
                                <ShieldCheck className="card-icon" />
                                <h3 className="card-title">Authentication Stress</h3>
                                <p className="card-content">
                                    Detection of consecutive failed logins. Pattern recognition separates
                                    normal "forgot password" events from distributed brute-force attempts.
                                </p>
                            </div>
                            <div className="info-card">
                                <HardDrive className="card-icon" />
                                <h3 className="card-title">Exfiltration Patterns</h3>
                                <p className="card-content">
                                    Scrutiny of data volume. Transferring unusually large packets or excessive
                                    megabytes over non-standard ports triggers data loss prevention (DLP) flags.
                                </p>
                            </div>
                            <div className="info-card">
                                <Fingerprint className="card-icon" />
                                <h3 className="card-title">Device Fingerprinting</h3>
                                <p className="card-content">
                                    Continuous verification of device trust. Changing IP addresses during active
                                    sessions or mismatching browser metadata lowers the trust score.
                                </p>
                            </div>
                            <div className="info-card">
                                <Globe className="card-icon" />
                                <h3 className="card-title">Protocol Integrity</h3>
                                <p className="card-content">
                                    Deep packet inspection for protocol anomalies. Using unencrypted ports or
                                    unusual protocol variations results in immediate isolation.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="info-section">
                        <h2 className="section-title">
                            <Layers className="w-8 h-8" />
                            Technical Specifications
                        </h2>
                        <div className="tech-details-grid">
                            <div className="tech-detail-card">
                                <Code className="tech-icon" />
                                <div className="tech-info">
                                    <h3>Programming Language</h3>
                                    <p>JavaScript, TypeScript, Python</p>
                                </div>
                            </div>
                            <div className="tech-detail-card">
                                <Layers className="tech-icon" />
                                <div className="tech-info">
                                    <h3>Web Framework</h3>
                                    <p>React (Vite), Supabase Edge Functions, Flask</p>
                                </div>
                            </div>
                            <div className="tech-detail-card">
                                <Activity className="tech-icon" />
                                <div className="tech-info">
                                    <h3>Machine Learning Libraries</h3>
                                    <p>Scikit-Learn (Isolation Forest), Pandas, NumPy</p>
                                </div>
                            </div>
                            <div className="tech-detail-card">
                                <Database className="tech-icon" />
                                <div className="tech-info">
                                    <h3>Database</h3>
                                    <p>Supabase (PostgreSQL), Realtime subscriptions</p>
                                </div>
                            </div>
                            <div className="tech-detail-card">
                                <Monitor className="tech-icon" />
                                <div className="tech-info">
                                    <h3>Frontend</h3>
                                    <p>React, Tailwind CSS, Shadcn UI, Lucide Icons</p>
                                </div>
                            </div>
                            <div className="tech-detail-card">
                                <Wrench className="tech-icon" />
                                <div className="tech-info">
                                    <h3>Development Tools</h3>
                                    <p>Vite, ESLint, TypeScript, VS Code</p>
                                </div>
                            </div>
                            <div className="tech-detail-card">
                                <GitBranch className="tech-icon" />
                                <div className="tech-info">
                                    <h3>Version Control</h3>
                                    <p>Git, GitHub</p>
                                </div>
                            </div>
                            <div className="tech-detail-card">
                                <Terminal className="tech-icon" />
                                <div className="tech-info">
                                    <h3>Optional Tools</h3>
                                    <p>Three.js, Recharts, GSAP, Framer Motion</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </PublicLayout>
    );
};

export default InformationPage;
