import { Link } from "react-router-dom";
import { Shield, Github, Linkedin, Mail } from "lucide-react";
import "./Footer.css";

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
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
