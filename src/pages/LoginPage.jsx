import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Checkbox from "@/components/Checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./LoginPage.css";

export default function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleAdminLogin = (e) => {
        e.preventDefault();
        navigate("/admin");
    };

    const handleUserLogin = (e) => {
        e.preventDefault();
        navigate("/dashboard");
    };

    return (
        <div className="login-wrapper">
            <div className="login-grid-overlay" />
            <div className="login-glow-element" />

            <div className="login-container">
                <div className="login-header">
                    <div className="login-logo-wrapper">
                        <div className="login-logo">
                            <Shield className="login-logo-icon" />
                            <div className="login-logo-glow" />
                        </div>
                    </div>
                    <h1 className="login-title">
                        <span className="login-title-primary">ZT</span>ADS
                    </h1>
                    <p className="login-subtitle">
                        Zero-Trust Anomaly Detection System
                        <br />
                        <span className="text-xs opacity-70">Project by Himanshu Pandey | Guided by Mr. Siddharth Meshram</span>
                    </p>
                </div>

                <div className="login-card">
                    <Tabs defaultValue="admin" className="w-full">
                        <TabsList className="login-tabs mb-6">
                            <TabsTrigger value="admin" className="login-tab">Admin</TabsTrigger>
                            <TabsTrigger value="user" className="login-tab">User</TabsTrigger>
                        </TabsList>

                        <TabsContent value="admin" className="login-tab-content">
                            <form onSubmit={handleAdminLogin} className="login-form">
                                <div className="login-form-group">
                                    <Label htmlFor="admin-email" className="login-form-label">Email</Label>
                                    <Input id="admin-email" type="email" placeholder="admin@ztads.com" defaultValue="admin@ztads.com" className="login-form-input" />
                                </div>
                                <div className="login-form-group">
                                    <Label htmlFor="admin-password" className="login-form-label">Password</Label>
                                    <div className="login-password-wrapper">
                                        <Input id="admin-password" type={showPassword ? "text" : "password"} placeholder="••••••••" defaultValue="admin123" className="login-form-input" style={{ paddingRight: '2.5rem' }} />
                                        <Button type="button" variant="ghost" size="icon" className="login-password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-4">
                                        <Checkbox
                                            id="admin-remember"
                                            scale={0.3}
                                            showExtras={false}
                                            onChange={(checked) => console.log("Remember admin:", checked)}
                                        />
                                        <label
                                            htmlFor="admin-remember"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-primary font-mono"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <Button type="submit" className="login-button primary">Sign In as Admin</Button>
                            </form>
                        </TabsContent>

                        <TabsContent value="user" className="login-tab-content">
                            <form onSubmit={handleUserLogin} className="login-form">
                                <div className="login-form-group">
                                    <Label htmlFor="user-email" className="login-form-label">Email</Label>
                                    <Input id="user-email" type="email" placeholder="user@ztads.com" defaultValue="user@ztads.com" className="login-form-input" />
                                </div>
                                <div className="login-form-group">
                                    <Label htmlFor="user-password" className="login-form-label">Password</Label>
                                    <div className="login-password-wrapper">
                                        <Input id="user-password" type={showPassword ? "text" : "password"} placeholder="••••••••" defaultValue="user123" className="login-form-input" style={{ paddingRight: '2.5rem' }} />
                                        <Button type="button" variant="ghost" size="icon" className="login-password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>
                                <Button type="submit" className="login-button">Sign In as User</Button>
                            </form>
                        </TabsContent>
                    </Tabs>

                    <p className="login-footer">
                        Demo mode: Click sign in to access the dashboard
                    </p>
                </div>
            </div>
        </div >
    );
}
