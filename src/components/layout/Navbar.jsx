import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X, Terminal, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md nav-plane-shadow scanlines">

            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">


                    <Link to="/" className="flex items-center gap-3 group relative perspective-1000">
                        <div className="relative preserve-3d group-hover:rotate-y-12 transition-transform duration-500">
                            <div className="p-2 border border-primary/30 bg-primary/5 relative overflow-hidden">
                                <Shield className="h-6 w-6 text-primary" />
                                <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary glow-primary" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-xl tracking-tighter uppercase leading-none text-white">
                                AMMY
                            </span>
                            <span className="text-[10px] font-mono text-primary/60 tracking-[0.3em] uppercase leading-none mt-1">
                                PROJECT_v2
                            </span>
                        </div>
                    </Link>


                    <div className="hidden md:flex items-center gap-2">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`relative px-6 py-2 group transition-all duration-300 ${isActive ? "text-primary" : "text-primary/40 hover:text-white"
                                        }`}
                                >
                                    <span className="relative z-10 text-xs font-mono font-bold tracking-widest uppercase">
                                        {item.label}
                                    </span>
                                    <div className={`absolute inset-0 border-l border-r border-primary/0 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-300 ${isActive ? "border-primary/50 bg-primary/10" : ""
                                        }`} />
                                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary transition-all duration-500 ${isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-50"
                                        }`} />
                                </Link>
                            );
                        })}
                    </div>


                    <div className="hidden md:flex items-center gap-6">
                        <div className="flex flex-col items-end px-4 border-r border-primary/20">
                            <span className="text-[8px] font-mono text-primary/40 uppercase tracking-widest">System_Auth</span>
                            <span className="text-[10px] font-mono text-success uppercase font-bold animate-pulse">Root_Access</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link to="/login">
                                <Button variant="ghost" size="sm" className="rounded-none font-mono text-[10px] uppercase tracking-widest hover:bg-primary/10 hover:text-white border border-transparent hover:border-primary/20">
                                    <Terminal className="h-3 w-3 mr-2" />
                                    Sign_In
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button size="sm" className="rounded-none bg-primary text-black hover:bg-white transition-all h-10 px-6 font-black uppercase tracking-tighter glow-primary group">
                                    Deploy
                                    <Lock className="h-3 w-3 ml-2 group-hover:rotate-12 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>


                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden border border-primary/20 rounded-none bg-primary/5 hover:bg-primary/20"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5 text-primary" /> : <Menu className="h-5 w-5 text-primary" />}
                    </Button>
                </div>


                {mobileMenuOpen && (
                    <div className="md:hidden py-6 border-t border-primary/20 animate-fade-in bg-black/95 absolute left-0 right-0 top-20 h-screen">
                        <div className="container mx-auto px-4 flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center justify-between p-4 border border-primary/10 transition-all ${location.pathname === item.path
                                        ? "bg-primary/10 border-primary/40 text-primary"
                                        : "text-primary/60 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <span className="text-sm font-mono font-bold tracking-widest uppercase">{item.label}</span>
                                    <Terminal className="h-4 w-4 opacity-40" />
                                </Link>
                            ))}
                            <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-primary/10">
                                <Link to="/login" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full rounded-none border-primary/20 font-mono uppercase tracking-widest h-12">
                                        System_Sign_In
                                    </Button>
                                </Link>
                                <Link to="/login" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full rounded-none bg-primary text-black font-black uppercase tracking-tighter h-12 glow-primary">
                                        Initiate_Deployment
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-10 pointer-events-none -z-10" />
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
