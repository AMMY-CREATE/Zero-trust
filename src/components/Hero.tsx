import { Link } from "react-router-dom";
import { Lock, ArrowRight, ShieldAlert, Cpu, Network, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export const Hero = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * -20;
            setMousePos({ x, y });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black scanlines perspective-1000 pt-20">
            {/* Background Image with 3D Parallax */}
            <div
                className="absolute inset-0 z-0 transition-transform duration-300 ease-out preserve-3d"
                style={{
                    transform: `rotateY(${mousePos.x * 0.2}deg) rotateX(${mousePos.y * 0.2}deg) scale(1.1)`
                }}
            >
                <img
                    src="/hero-actor.png"
                    alt="Cyber Threat Actor"
                    className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
            </div>

            {/* Interactive Data Nodes (Holographic Effects) */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                <div className="absolute top-[20%] left-[15%] floating-hologram" style={{ animationDelay: '0s' }}>
                    <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-none backdrop-blur-sm">
                        <Cpu className="h-3 w-3 text-primary" />
                        <span className="text-[10px] font-mono text-primary uppercase">CPU_READY</span>
                    </div>
                </div>
                <div className="absolute top-[30%] right-[10%] floating-hologram" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center gap-2 px-3 py-1 bg-info/10 border border-info/30 rounded-none backdrop-blur-sm">
                        <Network className="h-3 w-3 text-info" />
                        <span className="text-[10px] font-mono text-info uppercase">NET_SECURE</span>
                    </div>
                </div>
                <div className="absolute bottom-[25%] left-[20%] floating-hologram" style={{ animationDelay: '2s' }}>
                    <div className="flex items-center gap-2 px-3 py-1 bg-danger/10 border border-danger/30 rounded-none backdrop-blur-sm">
                        <Zap className="h-3 w-3 text-danger" />
                        <span className="text-[10px] font-mono text-danger uppercase">THREAT_LEVEL: HIGH</span>
                    </div>
                </div>
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-20 pointer-events-none" />

            {/* Content Container with 3D Tilt */}
            <div
                className="container mx-auto px-4 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center transition-transform duration-300 ease-out preserve-3d"
                style={{
                    transform: `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`
                }}
            >

                {/* Left Side: Vertical Branding */}
                <div className="hidden lg:flex col-span-1 flex-col items-center justify-center space-y-8 animate-fade-in group pointer-events-none">
                    <div className="w-[2px] h-32 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
                    <span className="vertical-text text-primary font-mono text-sm tracking-[0.5em]">SYSTEM_AUTH</span>
                    <div className="w-4 h-4 rounded-full bg-primary glow-primary matrix-pulse" />
                    <span className="vertical-text text-primary/40 font-mono text-[10px] tracking-[0.5em]">OPERATIONAL</span>
                    <div className="w-[2px] h-32 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                </div>

                {/* Center Content */}
                <div className="col-span-1 lg:col-span-10 text-center space-y-12">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary/5 border border-primary/20 rounded-none backdrop-blur-md animate-fade-in group hover:border-primary/50 transition-colors cursor-crosshair">
                        <Lock className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-mono tracking-widest uppercase">Protocol: ZERO_TRUST_v2.0</span>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-none animate-scale-in">
                            <span className="block text-white hover:text-primary transition-colors duration-500 glitch" data-text="Ammy">Ammy</span>
                            <span className="block gradient-text italic hover-3d cursor-default">Project</span>
                        </h1>
                        <div className="flex items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <div className="h-[1px] w-12 bg-primary/50" />
                            <p className="text-sm font-mono text-primary/80 tracking-widest uppercase">
                                Anomaly Detection & Response
                            </p>
                            <div className="h-[1px] w-12 bg-primary/50" />
                        </div>
                    </div>

                    <p className="max-w-xl mx-auto text-muted-foreground text-base uppercase tracking-widest leading-relaxed font-mono opacity-80 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        Securing the digital frontier. Behavioral intelligence meets next-gen encryption.
                        <br />
                        <span className="text-primary font-bold animate-pulse">STATUS: ADVERSARY DETECTED</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                        <Link to="/admin">
                            <Button size="xl" className="rounded-none bg-primary text-black hover:bg-white transition-all px-12 h-16 text-lg font-black uppercase tracking-tighter group flex items-center gap-3 glow-primary active:scale-95">
                                Enter Terminal <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <div className="flex flex-col items-start px-4 border-l-2 border-primary/20 hover:border-primary transition-colors group">
                            <span className="text-[10px] font-mono text-primary/60 uppercase group-hover:text-primary">System Integrity</span>
                            <div className="flex gap-1 mt-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="w-3 h-1 bg-primary group-hover:animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Threat Monitor (Vertical Bar) */}
                <div className="hidden lg:flex col-span-1 flex-col items-center justify-center space-y-4 animate-fade-in">
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-[8px] font-mono text-danger uppercase font-bold">Threat</span>
                        <div className="w-4 h-64 bg-card/20 border border-border/50 relative overflow-hidden">
                            <div className="absolute bottom-0 left-0 right-0 bg-danger/50 animate-pulse" style={{ height: '70%' }} />
                            <div className="absolute bottom-0 left-0 right-0 bg-danger w-full h-[2px] animate-bounce" style={{ bottom: '70%' }} />
                        </div>
                        <span className="text-[10px] font-mono text-danger">70%</span>
                    </div>
                    <div className="w-[1px] h-10 bg-primary/20" />
                    <ShieldAlert className="h-6 w-6 text-primary animate-pulse" />
                </div>
            </div>

            {/* Bottom Decorative Element */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-20" />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-30">
                <div className="w-12 h-[1px] bg-white" />
                <span className="text-[8px] font-mono uppercase tracking-[0.5em]">Secure_Handshake_256bit</span>
                <div className="w-12 h-[1px] bg-white" />
            </div>
        </section>
    );
};

