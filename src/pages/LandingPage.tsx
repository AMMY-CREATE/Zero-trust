import { Link } from "react-router-dom";
import { Activity, Brain, Bell, Eye, ArrowRight, ShieldAlert, Cpu, Network, Zap, Lock, Terminal, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Hero } from "@/components/Hero";
import { SmokeOverlay } from "@/components/effects/SmokeOverlay";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { DigitalRain } from "@/components/effects/DigitalRain";

const features = [
  { icon: ShieldAlert, title: "Continuous Verification", description: "Never trust, always verify every access request", code: "PROT_V1" },
  { icon: Brain, title: "AI-Based Detection", description: "Machine learning powered anomaly detection", code: "NEURAL_NET" },
  { icon: Activity, title: "Risk Scoring", description: "Dynamic risk assessment for all users", code: "RISK_CALC" },
  { icon: Bell, title: "Real-Time Alerts", description: "Instant notifications for security events", code: "ALERT_SVC" },
];

const stats = [
  { value: "99.9%", label: "Detection Rate", prefix: "DET_RATE" },
  { value: "<50ms", label: "Response Time", prefix: "LATENCY" },
  { value: "10M+", label: "Events Analyzed", prefix: "DATA_VOL" },
  { value: "24/7", label: "Monitoring", prefix: "UPTIME" },
];

export default function LandingPage() {
  return (
    <PublicLayout>
      <SmokeOverlay />
      <Hero />

      {/* Grid Background shared throughout */}
      <div className="bg-black relative overflow-hidden">
        <DigitalRain />
        <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-10 pointer-events-none" />

        {/* Stats Section */}
        <section className="py-24 border-y border-primary/20 bg-primary/[0.02] relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {stats.map((stat, i) => (
                <ScrollReveal key={i} delay={i * 100} variant="slide-up">
                  <div className="text-center group">
                    <span className="text-[10px] font-mono text-primary/40 uppercase tracking-widest">{stat.prefix}</span>
                    <p className="text-5xl font-black text-white group-hover:text-primary transition-colors duration-500 mt-2 tracking-tighter">{stat.value}</p>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em] mt-2">{stat.label}</p>
                    <div className="w-12 h-[1px] bg-primary/20 mx-auto mt-4 group-hover:w-24 transition-all duration-500" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <ScrollReveal variant="slide-up">
              <div className="text-center mb-24 space-y-4">
                <div className="inline-block px-4 py-1 border border-primary/30 bg-primary/5 text-[10px] font-mono text-primary uppercase tracking-[0.4em]">Section_02 // Features</div>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                  Comprehensive <span className="text-primary italic">Security</span>
                </h2>
                <div className="w-24 h-[2px] bg-primary/50 mx-auto" />
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature, i) => (
                <ScrollReveal key={i} delay={i * 150} variant={i % 2 === 0 ? "slide-left" : "slide-right"}>
                  <div className="h-full bg-black/40 border border-primary/10 p-8 hover:border-primary/40 hover:bg-primary/5 transition-all duration-500 group relative overflow-hidden">
                    {/* Corner accents */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/0 group-hover:border-primary/40 transition-all duration-500" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/0 group-hover:border-primary/40 transition-all duration-500" />

                    <div className="flex justify-between items-start mb-8">
                      <div className="p-3 border border-primary/20 bg-primary/5 group-hover:glow-primary transition-all duration-500">
                        <feature.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-[8px] font-mono text-primary/30 group-hover:text-primary/60 transition-colors tracking-widest">{feature.code}</span>
                    </div>

                    <h3 className="font-bold text-xl text-white mb-4 uppercase tracking-tighter group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest leading-relaxed font-mono opacity-60 group-hover:opacity-100 transition-opacity">
                      {feature.description}
                    </p>

                    <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="h-[1px] flex-grow bg-primary/20" />
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Tactical System Status Section (New) */}
        <section className="py-24 border-t border-primary/10">
          <div className="container mx-auto px-4">
            <ScrollReveal variant="slide-up">
              <div className="bg-primary/5 border border-primary/20 p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter">System_Integrity_Monitor</h3>
                    <p className="text-base font-mono text-primary/60 uppercase tracking-widest leading-relaxed">
                      Our continuous monitoring engine analyzes 10M+ events daily, utilizing a zero-trust handshake protocol for every interaction.
                    </p>
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="w-2 h-2 bg-primary matrix-pulse" />
                          <div className="flex-grow h-1 bg-primary/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary/40 animate-pulse" style={{ width: `${40 + i * 15}%` }} />
                          </div>
                          <span className="text-[10px] font-mono text-primary/40">NODE_0{i}_ACTIVE</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center md:justify-end">
                    <Link to="/login" className="group relative">
                      <div className="absolute -inset-4 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Button size="lg" variant="outline" className="rounded-none border-primary/40 font-black uppercase tracking-tighter px-12 h-16 relative bg-black hover:bg-primary hover:text-black hover:border-primary transition-all duration-300">
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
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center space-y-12 relative z-10">
            <ScrollReveal variant="scale">
              <div className="relative inline-block">
                <Shield className="h-24 w-24 text-primary/20 absolute -top-12 -left-12 animate-pulse" />
                <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
                  Initiate <span className="text-primary italic">Protection</span>
                </h2>
                <Shield className="h-24 w-24 text-primary/20 absolute -bottom-12 -right-12 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
              <p className="text-primary/60 font-mono text-[10px] uppercase tracking-[0.5em] mt-8 mb-12">Deployment_Ready_v2.0.4</p>
              <Link to="/login">
                <Button size="lg" className="rounded-none bg-primary text-black hover:bg-white transition-all px-16 h-20 text-xl font-black uppercase tracking-tighter glow-primary group">
                  Deploy Now <Zap className="ml-3 h-6 w-6 group-hover:animate-bounce" />
                </Button>
              </Link>
            </ScrollReveal>
          </div>

          {/* Background Decorative */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        </section>
      </div>

      {/* Footer Branding Overlay */}
      <div className="py-8 bg-black border-t border-primary/10 relative z-20">
        <div className="container mx-auto px-4 flex flex-col md:row justify-between items-center gap-4">
          <div className="flex items-center gap-4 opacity-30 group grayscale hover:grayscale-0 transition-all duration-500">
            <Lock className="h-3 w-3 text-primary" />
            <span className="text-[8px] font-mono uppercase tracking-[0.5em]">AES_256_ENCRYPTED_SESSION</span>
          </div>
          <span className="text-[8px] font-mono text-primary/20 uppercase tracking-[0.2em]">© 2025 AMMY_PROJECT CORE_DIVISION</span>
        </div>
      </div>
    </PublicLayout>
  );
}
