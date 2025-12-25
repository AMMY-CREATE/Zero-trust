import { Link } from "react-router-dom";
import { Activity, Brain, Bell, Eye, ArrowRight, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Hero } from "@/components/Hero";

const features = [
  { icon: ShieldAlert, title: "Continuous Verification", description: "Never trust, always verify every access request" },
  { icon: Brain, title: "AI-Based Detection", description: "Machine learning powered anomaly detection" },
  { icon: Activity, title: "Risk Scoring", description: "Dynamic risk assessment for all users" },
  { icon: Bell, title: "Real-Time Alerts", description: "Instant notifications for security events" },
];

const stats = [
  { value: "99.9%", label: "Detection Rate" },
  { value: "<50ms", label: "Response Time" },
  { value: "10M+", label: "Events Analyzed" },
  { value: "24/7", label: "Monitoring" },
];

export default function LandingPage() {
  return (
    <PublicLayout>
      <Hero />


      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Security Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built on Zero-Trust principles with advanced machine learning for insider threat detection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all group">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Organization?</h2>
          <p className="text-muted-foreground mb-8">Start monitoring and protecting your infrastructure today</p>
          <Link to="/login">
            <Button size="lg" className="glow-primary">Get Started Now</Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
