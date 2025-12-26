import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-20" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />

            <div className="w-full max-w-md p-8 relative z-10">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            <Shield className="h-16 w-16 text-primary" />
                            <div className="absolute inset-0 bg-primary/30 blur-2xl" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">
                        <span className="text-primary">ZT</span>ADS
                    </h1>
                    <p className="text-muted-foreground mt-2">Sign in to access the security dashboard</p>
                </div>

                <div className="bg-card rounded-xl border border-border p-6">
                    <Tabs defaultValue="admin" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="admin">Admin</TabsTrigger>
                            <TabsTrigger value="user">User</TabsTrigger>
                        </TabsList>

                        <TabsContent value="admin">
                            <form onSubmit={handleAdminLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="admin-email">Email</Label>
                                    <Input id="admin-email" type="email" placeholder="admin@ztads.com" defaultValue="admin@ztads.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="admin-password">Password</Label>
                                    <div className="relative">
                                        <Input id="admin-password" type={showPassword ? "text" : "password"} placeholder="••••••••" defaultValue="admin123" />
                                        <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>
                                <Button type="submit" className="w-full glow-primary">Sign In as Admin</Button>
                            </form>
                        </TabsContent>

                        <TabsContent value="user">
                            <form onSubmit={handleUserLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="user-email">Email</Label>
                                    <Input id="user-email" type="email" placeholder="user@ztads.com" defaultValue="user@ztads.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="user-password">Password</Label>
                                    <div className="relative">
                                        <Input id="user-password" type={showPassword ? "text" : "password"} placeholder="••••••••" defaultValue="user123" />
                                        <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>
                                <Button type="submit" className="w-full">Sign In as User</Button>
                            </form>
                        </TabsContent>
                    </Tabs>

                    <p className="text-xs text-center text-muted-foreground mt-6">
                        Demo mode: Click sign in to access the dashboard
                    </p>
                </div>
            </div>
        </div>
    );
}
