import { Link } from "react-router-dom";
import { Shield, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-border bg-card/50">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2">
                            <Shield className="h-8 w-8 text-primary" />
                            <span className="font-bold text-xl">
                                <span className="text-primary">ZT</span>ADS
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm">
                            Zero-Trust Anomaly Detection System. Never Trust, Always Verify.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>


                    <div>
                        <h3 className="font-semibold mb-4">Platform</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/features" className="hover:text-primary transition-colors">Features</Link></li>
                            <li><Link to="/architecture" className="hover:text-primary transition-colors">Architecture</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
                            <li><Link to="/login" className="hover:text-primary transition-colors">Dashboard</Link></li>
                        </ul>
                    </div>


                    <div>
                        <h3 className="font-semibold mb-4">Security</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary transition-colors">Zero-Trust Model</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">ML Detection</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Risk Scoring</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Compliance</a></li>
                        </ul>
                    </div>


                    <div>
                        <h3 className="font-semibold mb-4">Academic</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><span>CSE Data Science Project</span></li>
                            <li><span>Cybersecurity Research</span></li>
                            <li><span>Machine Learning</span></li>
                            <li><span>Documentation</span></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} ZTADS. Academic Project - CSE Data Science.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Built with React, JavaScript & Machine Learning
                    </p>
                </div>
            </div>
        </footer>
    );
}
