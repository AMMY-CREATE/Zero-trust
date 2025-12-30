import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X, Terminal, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import "./Navbar.css";

const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/#about" },
    { label: "Features", path: "/#features" },
    { label: "Architecture", path: "/#architecture" },
];

export function Navbar() {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="navbar">

            <div className="navbar-divider" />

            <div className="navbar-container">
                <div className="navbar-inner">


                    <Link to="/" className="navbar-logo">
                        <div className="navbar-logo-icon-wrapper">
                            <div className="navbar-logo-icon-border">
                                <Shield className="navbar-logo-icon" />
                                <div className="navbar-logo-icon-pulse" />
                            </div>
                            <div className="navbar-logo-dot" />
                        </div>
                        <div className="navbar-logo-text">
                            <span className="navbar-logo-main">AMMY</span>
                            <span className="navbar-logo-sub">PROJECT_v2</span>
                        </div>
                    </Link>


                    <div className="navbar-menu">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`navbar-nav-item ${isActive ? 'active' : ''}`}
                                >
                                    <span className="navbar-nav-text">
                                        {item.label}
                                    </span>
                                    <div className="navbar-nav-underlay" />
                                    <div className="navbar-nav-underline" />
                                </Link>
                            );
                        })}
                    </div>


                    <div className="navbar-auth">
                        <div className="navbar-auth-status">
                            <span className="navbar-auth-label">System_Auth</span>
                            <span className="navbar-auth-status-text">Root_Access</span>
                        </div>

                        <div className="navbar-buttons">
                            <Link to="/login">
                                <Button variant="ghost" size="sm" className="navbar-btn-signin">
                                    <Terminal style={{ height: '0.75rem', width: '0.75rem', marginRight: '0.5rem' }} />
                                    Sign_In
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button size="sm" className="navbar-btn-deploy">
                                    Deploy
                                    <Lock className="navbar-btn-deploy-icon" />
                                </Button>
                            </Link>
                        </div>
                    </div>


                    <Button
                        variant="ghost"
                        size="icon"
                        className="navbar-mobile-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="navbar-mobile-toggle-icon" />
                        ) : (
                            <Menu className="navbar-mobile-toggle-icon" />
                        )}
                    </Button>
                </div>


                {mobileMenuOpen && (
                    <div className={`navbar-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                        <div className="navbar-mobile-items">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`navbar-mobile-item ${location.pathname === item.path ? 'active' : ''}`}
                                >
                                    <span className="navbar-mobile-item-text">{item.label}</span>
                                    <Terminal className="navbar-mobile-item-icon" />
                                </Link>
                            ))}
                            <div className="navbar-mobile-buttons">
                                <Link to="/login" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="outline" className="navbar-mobile-btn navbar-mobile-btn-signin">
                                        System_Sign_In
                                    </Button>
                                </Link>
                                <Link to="/login" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="navbar-mobile-btn navbar-mobile-btn-deploy">
                                        Initiate_Deployment
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="navbar-mobile-menu-grid" />
                    </div>
                )}
            </div>


            <svg className="navbar-wave" viewBox="0 0 1440 32" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h1440v20c-150 15-350-15-720 0s-570 15-720 0V0z" />
                <path className="wave-accent" d="M0 15c150 15 350-15 720 0s570 15 720 0" strokeDasharray="5,10" />
            </svg>
        </nav>
    );
}
