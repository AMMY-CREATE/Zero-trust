import { Link } from "react-router-dom";
import { Lock, ArrowRight, ShieldAlert, Cpu, Network, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import "./Hero.css";

export const Hero = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isMoving, setIsMoving] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setIsMoving(true);
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * -20;
            setMousePos({ x, y });
        };

        const handleMouseLeave = () => {
            setIsMoving(false);
            setMousePos({ x: 0, y: 0 });
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <section className="hero-section">
            {/* Background Image with 3D Parallax */}
            <div
                className="hero-background"
                style={{
                    transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0) rotateY(${mousePos.x * 0.15}deg) rotateX(${mousePos.y * 0.15}deg) scale(1.15)`,
                    transition: isMoving ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
            >
                <img
                    src="/hero-actor.png"
                    alt="Cyber Threat Actor"
                    className="hero-bg-image"
                />
                <div className="hero-background-gradient-v" />
                <div className="hero-background-gradient-h" />
            </div>

            {/* Interactive Data Nodes (Holographic Effects) */}
            <div className="hero-nodes">
                <div className="hero-node hero-node-top-left" style={{ animationDelay: '0s' }}>
                    <Cpu className="hero-node-icon" style={{ color: 'rgb(34 197 94)' }} />
                    <span className="hero-node-text" style={{ color: 'rgb(34 197 94)' }}>CPU_READY</span>
                </div>
                <div className="hero-node hero-node-top-right" style={{ animationDelay: '1s', background: 'rgba(6 182 212 / 0.1)', borderColor: 'rgba(6 182 212 / 0.3)' }}>
                    <Network className="hero-node-icon" style={{ color: '#06b6d4' }} />
                    <span className="hero-node-text" style={{ color: '#06b6d4' }}>NET_SECURE</span>
                </div>
                <div className="hero-node hero-node-bottom-left" style={{ animationDelay: '2s', background: 'rgba(220 38 38 / 0.1)', borderColor: 'rgba(220 38 38 / 0.3)' }}>
                    <Zap className="hero-node-icon" style={{ color: '#dc2626' }} />
                    <span className="hero-node-text" style={{ color: '#dc2626' }}>THREAT_LEVEL: HIGH</span>
                </div>
            </div>

            {/* Grid Overlay */}
            <div className="hero-grid-overlay" />

            {/* Content Container with 3D Tilt */}
            <div
                className="hero-container"
                style={{
                    transform: `rotateY(${mousePos.x * 0.5}deg) rotateX(${mousePos.y * 0.5}deg)`,
                    transition: isMoving ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
            >

                {/* Left Side: Vertical Branding */}
                <div className="hero-left">
                    <div className="hero-branding-line" />
                    <span className="hero-vertical-text">SYSTEM_AUTH</span>
                    <div className="hero-center-dot" />
                    <span className="hero-vertical-text hero-vertical-text-muted">OPERATIONAL</span>
                    <div className="hero-branding-line hero-branding-line-bottom" />
                </div>

                {/* Center Content */}
                <div className="hero-center">
                    <div className="hero-badge">
                        <Lock className="hero-badge-icon" />
                        <span className="hero-badge-text">Protocol: ZERO_TRUST_v2.0</span>
                    </div>

                    <div className="hero-title-wrapper">
                        <h1 className="hero-title">
                            <span className="hero-title-main">Ammy</span>
                            <span className="hero-title-accent">Project</span>
                        </h1>
                        <div className="hero-divider-wrapper">
                            <div className="hero-divider" />
                            <p className="hero-divider-text">
                                Anomaly Detection & Response
                            </p>
                            <div className="hero-divider" />
                        </div>
                    </div>

                    <p className="hero-description">
                        Securing the digital frontier. Behavioral intelligence meets next-gen encryption.
                        <br />
                        <span className="hero-description-alert">STATUS: ADVERSARY DETECTED</span>
                    </p>

                    <div className="hero-actions">
                        <Link to="/admin">
                            <Button size="xl" className="hero-button">
                                Enter Terminal <ArrowRight className="hero-button-icon" />
                            </Button>
                        </Link>
                        <div className="hero-integrity-info">
                            <span className="hero-integrity-label">System Integrity</span>
                            <div className="hero-integrity-bars">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="hero-integrity-bar" style={{ animationDelay: `${i * 0.1}s` }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Threat Monitor (Vertical Bar) */}
                <div className="hero-right">
                    <div className="hero-threat-container">
                        <span className="hero-threat-label">Threat</span>
                        <div className="hero-threat-bar">
                            <div className="hero-threat-fill" style={{ height: '70%' }} />
                            <div className="hero-threat-indicator" style={{ bottom: '70%' }} />
                        </div>
                        <span className="hero-threat-percentage">70%</span>
                    </div>
                    <div className="hero-threat-divider" />
                    <ShieldAlert className="hero-threat-icon" />
                </div>
            </div>

            {/* Bottom Decorative Element */}
            <div className="hero-bottom-gradient" />
            <div className="hero-bottom-decoration">
                <div className="hero-bottom-line" />
                <span className="hero-bottom-text">Secure_Handshake_256bit</span>
                <div className="hero-bottom-line" />
            </div>
        </section>
    );
};
