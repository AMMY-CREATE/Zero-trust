import { Link } from "react-router-dom";
import { Shield, Github, Linkedin, Mail } from "lucide-react";
import "./Footer.css";

export function Footer() {
    return (
        <footer className="footer relative pt-24 mt-20">
            {/* Dynamic Wave Transition */}
            <div className="footer-waves">
                <svg className="footer-wave footer-wave-1" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,106.7C1248,96,1344,64,1392,48L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
                </svg>
                <svg className="footer-wave footer-wave-2" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,90.7C672,107,768,117,864,117.3C960,117,1056,107,1152,90.7C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
                </svg>
                <svg className="footer-wave footer-wave-3" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,53.3C672,43,768,21,864,16C960,11,1056,21,1152,42.7C1248,64,1344,96,1392,112L1440,128L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
                </svg>
            </div>

            <div className="footer-smoke-container">
                <div className="footer-smoke-layer layer-1"></div>
                <div className="footer-smoke-layer layer-2"></div>
            </div>

            <div className="footer-cyber-grid" />
            <div className="footer-bg-glow" />
            <div className="footer-container relative z-10">
                <div className="footer-grid">

                    <div className="footer-section">
                        <Link to="/" className="footer-logo-link">
                            <Shield className="footer-logo-icon" />
                            <span className="footer-logo-text">
                                <span className="footer-logo-text-primary">ZT</span>ADS
                            </span>
                        </Link>
                        <p className="footer-description">
                            Zero-Trust Anomaly Detection System (ZTADS).
                            <br />"Never Trust, Always Verify."
                        </p>
                        <div className="footer-social-links">
                            <a href="#" className="footer-social-link">
                                <Github className="footer-social-icon" />
                            </a>
                            <a href="#" className="footer-social-link">
                                <Linkedin className="footer-social-icon" />
                            </a>
                            <a href="#" className="footer-social-link">
                                <Mail className="footer-social-icon" />
                            </a>
                        </div>
                    </div>


                    <div className="footer-column">
                        <h3 className="footer-column-title">Platform</h3>
                        <ul className="footer-column-list">
                            <li className="footer-column-item"><Link to="/features" className="footer-column-link">Features</Link></li>
                            <li className="footer-column-item"><Link to="/architecture" className="footer-column-link">Architecture</Link></li>
                            <li className="footer-column-item"><Link to="/about" className="footer-column-link">About</Link></li>
                            <li className="footer-column-item"><Link to="/login" className="footer-column-link">Dashboard</Link></li>
                        </ul>
                    </div>


                    <div className="footer-column">
                        <h3 className="footer-column-title">Security</h3>
                        <ul className="footer-column-list">
                            <li className="footer-column-item"><a href="#" className="footer-column-link">Zero-Trust Model</a></li>
                            <li className="footer-column-item"><a href="#" className="footer-column-link">ML Detection</a></li>
                            <li className="footer-column-item"><a href="#" className="footer-column-link">Risk Scoring</a></li>
                            <li className="footer-column-item"><a href="#" className="footer-column-link">Compliance</a></li>
                        </ul>
                    </div>


                    <div className="footer-column">
                        <h3 className="footer-column-title">Academic</h3>
                        <ul className="footer-column-list">
                            <li className="footer-column-item"><span>Department of CSE</span></li>
                            <li className="footer-column-item"><span>CSVTU Bhilai</span></li>
                            <li className="footer-column-item"><span>Under Guidance of Mr. Siddharth Meshram</span></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-left">
                        <p className="footer-bottom-text">
                            © {new Date().getFullYear()} ZTADS. Developed by Himanshu Pandey.
                        </p>
                        <p className="footer-bottom-text">
                            Built with React, JavaScript & Machine Learning
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
